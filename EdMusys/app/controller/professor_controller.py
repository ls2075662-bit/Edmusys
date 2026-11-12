import re
from datetime import date, datetime
from typing import List, Optional, Union
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.db_models import ProfessorModel, AgendamentoModel
from app.core.security import gerar_hash_senha
from app.core.deps import obter_usuario_logado

router = APIRouter(prefix="/api/professores", tags=["Professores"])


class ProfessorPayload(BaseModel):
    nome: str
    cpf: str
    especialidade: Optional[str] = None
    instrumento: Optional[str] = None
    dataNascimento: Optional[str] = None
    data_nascimento: Optional[str] = None
    telefone: str
    email: str
    diasDisponiveis: Optional[Union[str, List[str]]] = None
    dias_disponiveis: Optional[Union[str, List[str]]] = None
    horariosDisponiveis: Optional[Union[str, List[str]]] = None
    horarios_disponiveis: Optional[Union[str, List[str]]] = None
    senha: Optional[str] = None


def _normalizar_lista_texto(valor: Optional[Union[str, List[str]]]) -> str:
    if isinstance(valor, list):
        return ", ".join(str(v).strip() for v in valor if str(v).strip())
    return (valor or "").strip()


def _parse_data(valor: Optional[str]) -> date:
    if not valor:
        return date(1990, 1, 1)
    return datetime.strptime(valor[:10], "%Y-%m-%d").date()


def _serializar_professor(pr: ProfessorModel) -> dict:
    dias_lista = [d.strip() for d in (pr.dias_disponiveis or "").split(",") if d.strip()]
    horas_lista = [h.strip() for h in (pr.horarios_disponiveis or "").split(",") if h.strip()]
    nasc_str = pr.data_nascimento.isoformat() if pr.data_nascimento else ""
    return {
        "id": pr.id_professor,
        "id_professor": pr.id_professor,
        "nome": pr.nome,
        "cpf": pr.cpf,
        "especialidade": pr.especialidade,
        "instrumento": pr.especialidade,
        "data_nascimento": nasc_str,
        "dataNascimento": nasc_str,
        "telefone": pr.telefone,
        "email": pr.email,
        "dias_disponiveis": pr.dias_disponiveis,
        "diasDisponiveis": dias_lista,
        "horarios_disponiveis": pr.horarios_disponiveis,
        "horariosDisponiveis": horas_lista,
    }


@router.get("")
def listar_professores(db: Session = Depends(get_db)):
    professores = db.query(ProfessorModel).all()
    return [_serializar_professor(p) for p in professores]


@router.post("", status_code=status.HTTP_201_CREATED)
def cadastrar_professor(
    dados: ProfessorPayload,
    db: Session = Depends(get_db),
    usuario_atual: dict = Depends(obter_usuario_logado),
):
    if usuario_atual.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Apenas administradores podem cadastrar professores.",
        )

    cpf_limpo = re.sub(r"\D", "", dados.cpf)
    if db.query(ProfessorModel).filter(ProfessorModel.email.ilike(dados.email.strip())).first():
        raise HTTPException(status_code=400, detail="Já existe um professor com este e-mail.")
    if db.query(ProfessorModel).filter(
        func.replace(func.replace(ProfessorModel.cpf, ".", ""), "-", "") == cpf_limpo
    ).first():
        raise HTTPException(status_code=400, detail="Já existe um professor com este CPF.")

    especialidade = (dados.especialidade or dados.instrumento or "A definir").strip()
    nasc = _parse_data(dados.dataNascimento or dados.data_nascimento)
    dias = _normalizar_lista_texto(dados.diasDisponiveis or dados.dias_disponiveis)
    horas = _normalizar_lista_texto(dados.horariosDisponiveis or dados.horarios_disponiveis)
    senha_plana = dados.senha if dados.senha and len(dados.senha) >= 6 else "12345678"

    novo_prof = ProfessorModel(
        nome=dados.nome.strip(),
        cpf=dados.cpf.strip(),
        especialidade=especialidade,
        data_nascimento=nasc,
        telefone=dados.telefone.strip(),
        email=dados.email.strip(),
        dias_disponiveis=dias,
        horarios_disponiveis=horas,
        senha_hash=gerar_hash_senha(senha_plana),
    )
    db.add(novo_prof)
    db.commit()
    db.refresh(novo_prof)
    return _serializar_professor(novo_prof)


@router.put("/{prof_id}")
def atualizar_professor(
    prof_id: int,
    dados: ProfessorPayload,
    db: Session = Depends(get_db),
    usuario_atual: dict = Depends(obter_usuario_logado),
):
    if usuario_atual.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Acesso negado.")

    prof = db.query(ProfessorModel).filter(ProfessorModel.id_professor == prof_id).first()
    if not prof:
        raise HTTPException(status_code=404, detail="Professor não encontrado.")

    prof.nome = dados.nome.strip()
    prof.cpf = dados.cpf.strip()
    prof.especialidade = (dados.especialidade or dados.instrumento or prof.especialidade).strip()
    if dados.dataNascimento or dados.data_nascimento:
        prof.data_nascimento = _parse_data(dados.dataNascimento or dados.data_nascimento)
    prof.telefone = dados.telefone.strip()
    prof.email = dados.email.strip()
    prof.dias_disponiveis = _normalizar_lista_texto(dados.diasDisponiveis or dados.dias_disponiveis)
    prof.horarios_disponiveis = _normalizar_lista_texto(dados.horariosDisponiveis or dados.horarios_disponiveis)
    if dados.senha and len(dados.senha) >= 6:
        prof.senha_hash = gerar_hash_senha(dados.senha)

    db.commit()
    db.refresh(prof)
    return _serializar_professor(prof)


@router.delete("/{prof_id}", status_code=status.HTTP_204_NO_CONTENT)
def excluir_professor(
    prof_id: int,
    db: Session = Depends(get_db),
    usuario_atual: dict = Depends(obter_usuario_logado),
):
    if usuario_atual.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Acesso negado.")

    prof = db.query(ProfessorModel).filter(ProfessorModel.id_professor == prof_id).first()
    if not prof:
        raise HTTPException(status_code=404, detail="Professor não encontrado.")

    db.query(AgendamentoModel).filter(AgendamentoModel.id_professor == prof_id).delete()
    db.delete(prof)
    db.commit()
