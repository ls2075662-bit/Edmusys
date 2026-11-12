import re
from datetime import date, datetime
from typing import List, Optional, Union
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.db_models import AlunoModel, AgendamentoModel
from app.core.security import gerar_hash_senha
from app.core.deps import obter_usuario_logado

router = APIRouter(prefix="/api/alunos", tags=["Alunos"])


class AlunoPayload(BaseModel):
    nome: str
    cpf: str
    instrumento: str
    dataNascimento: Optional[str] = None
    data_nascimento: Optional[str] = None
    telefone: str
    email: str
    diasDisponiveis: Optional[Union[str, List[str]]] = None
    dias_disponiveis: Optional[Union[str, List[str]]] = None
    horariosDisponiveis: Optional[Union[str, List[str]]] = None
    horarios_disponiveis: Optional[Union[str, List[str]]] = None
    plano: Union[str, int] = "1"
    senha: Optional[str] = None


def _normalizar_lista_texto(valor: Optional[Union[str, List[str]]]) -> str:
    if isinstance(valor, list):
        return ", ".join(str(v).strip() for v in valor if str(v).strip())
    return (valor or "").strip()


def _parse_data(valor: Optional[str]) -> date:
    if not valor:
        return date(2000, 1, 1)
    return datetime.strptime(valor[:10], "%Y-%m-%d").date()


def _serializar_aluno(al: AlunoModel) -> dict:
    dias_lista = [d.strip() for d in (al.dias_disponiveis or "").split(",") if d.strip()]
    horas_lista = [h.strip() for h in (al.horarios_disponiveis or "").split(",") if h.strip()]
    nasc_str = al.data_nascimento.isoformat() if al.data_nascimento else ""
    return {
        "id": al.id_aluno,
        "id_aluno": al.id_aluno,
        "nome": al.nome,
        "cpf": al.cpf,
        "instrumento": al.instrumento,
        "data_nascimento": nasc_str,
        "dataNascimento": nasc_str,
        "telefone": al.telefone,
        "email": al.email,
        "dias_disponiveis": al.dias_disponiveis,
        "diasDisponiveis": dias_lista,
        "horarios_disponiveis": al.horarios_disponiveis,
        "horariosDisponiveis": horas_lista,
        "plano": al.plano,
        "pago": False,
    }


@router.get("")
def listar_alunos(db: Session = Depends(get_db)):
    alunos = db.query(AlunoModel).all()
    return [_serializar_aluno(a) for a in alunos]


@router.post("", status_code=status.HTTP_201_CREATED)
def cadastrar_aluno(
    dados: AlunoPayload,
    db: Session = Depends(get_db),
    usuario_atual: dict = Depends(obter_usuario_logado),
):
    if usuario_atual.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Apenas administradores podem cadastrar alunos.",
        )

    cpf_limpo = re.sub(r"\D", "", dados.cpf)
    if db.query(AlunoModel).filter(AlunoModel.email.ilike(dados.email.strip())).first():
        raise HTTPException(status_code=400, detail="Já existe um aluno com este e-mail.")
    if db.query(AlunoModel).filter(
        func.replace(func.replace(AlunoModel.cpf, ".", ""), "-", "") == cpf_limpo
    ).first():
        raise HTTPException(status_code=400, detail="Já existe um aluno com este CPF.")

    nasc = _parse_data(dados.dataNascimento or dados.data_nascimento)
    dias = _normalizar_lista_texto(dados.diasDisponiveis or dados.dias_disponiveis)
    horas = _normalizar_lista_texto(dados.horariosDisponiveis or dados.horarios_disponiveis)
    senha_plana = dados.senha if dados.senha and len(dados.senha) >= 6 else "12345678"

    novo_aluno = AlunoModel(
        nome=dados.nome.strip(),
        cpf=dados.cpf.strip(),
        instrumento=dados.instrumento.strip(),
        data_nascimento=nasc,
        telefone=dados.telefone.strip(),
        email=dados.email.strip(),
        dias_disponiveis=dias,
        horarios_disponiveis=horas,
        plano=str(dados.plano),
        senha_hash=gerar_hash_senha(senha_plana),
    )
    db.add(novo_aluno)
    db.commit()
    db.refresh(novo_aluno)
    return _serializar_aluno(novo_aluno)


@router.put("/{aluno_id}")
def atualizar_aluno(
    aluno_id: int,
    dados: AlunoPayload,
    db: Session = Depends(get_db),
    usuario_atual: dict = Depends(obter_usuario_logado),
):
    if usuario_atual.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Acesso negado.")

    aluno = db.query(AlunoModel).filter(AlunoModel.id_aluno == aluno_id).first()
    if not aluno:
        raise HTTPException(status_code=404, detail="Aluno não encontrado.")

    aluno.nome = dados.nome.strip()
    aluno.cpf = dados.cpf.strip()
    aluno.instrumento = dados.instrumento.strip()
    if dados.dataNascimento or dados.data_nascimento:
        aluno.data_nascimento = _parse_data(dados.dataNascimento or dados.data_nascimento)
    aluno.telefone = dados.telefone.strip()
    aluno.email = dados.email.strip()
    aluno.dias_disponiveis = _normalizar_lista_texto(dados.diasDisponiveis or dados.dias_disponiveis)
    aluno.horarios_disponiveis = _normalizar_lista_texto(dados.horariosDisponiveis or dados.horarios_disponiveis)
    aluno.plano = str(dados.plano)
    if dados.senha and len(dados.senha) >= 6:
        aluno.senha_hash = gerar_hash_senha(dados.senha)

    db.commit()
    db.refresh(aluno)
    return _serializar_aluno(aluno)


@router.delete("/{aluno_id}", status_code=status.HTTP_204_NO_CONTENT)
def excluir_aluno(
    aluno_id: int,
    db: Session = Depends(get_db),
    usuario_atual: dict = Depends(obter_usuario_logado),
):
    if usuario_atual.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Acesso negado.")

    aluno = db.query(AlunoModel).filter(AlunoModel.id_aluno == aluno_id).first()
    if not aluno:
        raise HTTPException(status_code=404, detail="Aluno não encontrado.")

    db.query(AgendamentoModel).filter(AgendamentoModel.id_aluno == aluno_id).delete()
    db.delete(aluno)
    db.commit()
