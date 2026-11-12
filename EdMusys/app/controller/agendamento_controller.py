from datetime import date, datetime, time
from typing import Optional, Union
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.db_models import AgendamentoModel, AdministradorModel
from app.core.deps import obter_usuario_logado

router = APIRouter(prefix="/api/agendamentos", tags=["Agendamentos"])

DIAS_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
# Semana de referência iniciando em Segunda-feira (2026-11-09) para compatibilidade com a coluna DATE do MySQL
DATAS_REFERENCIA = {
    "Segunda": date(2026, 11, 9),
    "Terça": date(2026, 11, 10),
    "Quarta": date(2026, 11, 11),
    "Quinta": date(2026, 11, 12),
    "Sexta": date(2026, 11, 13),
    "Sábado": date(2026, 11, 14),
    "Domingo": date(2026, 11, 15),
}


class AgendamentoPayload(BaseModel):
    instrumento: str
    dia: str
    hora: Optional[str] = None
    horario: Optional[str] = None
    alunoId: Optional[Union[int, str]] = None
    id_aluno: Optional[Union[int, str]] = None
    professorId: Optional[Union[int, str]] = None
    id_professor: Optional[Union[int, str]] = None


def _dia_para_date(dia_valor: str) -> date:
    dia_limpo = (dia_valor or "").strip()
    if dia_limpo in DATAS_REFERENCIA:
        return DATAS_REFERENCIA[dia_limpo]
    return datetime.strptime(dia_limpo[:10], "%Y-%m-%d").date()


def _hora_para_time(hora_valor: str) -> time:
    h = (hora_valor or "09:00").strip()
    return datetime.strptime(h[:5], "%H:%M").time()


def _serializar_agendamento(ag: AgendamentoModel) -> dict:
    dia_nome = DIAS_SEMANA[ag.dia.weekday()] if ag.dia else "Segunda"
    hora_str = ag.horario.strftime("%H:%M") if ag.horario else "09:00"
    return {
        "id": ag.id_agendamento,
        "id_agendamento": ag.id_agendamento,
        "instrumento": ag.instrumento,
        "dia": dia_nome,
        "data": ag.dia.isoformat() if ag.dia else "",
        "hora": hora_str,
        "alunoId": ag.id_aluno,
        "id_aluno": ag.id_aluno,
        "professorId": ag.id_professor,
        "id_professor": ag.id_professor,
        "id_administrador": ag.id_administrador,
    }


@router.get("")
def listar_agendamentos(db: Session = Depends(get_db)):
    agendamentos = db.query(AgendamentoModel).all()
    return [_serializar_agendamento(ag) for ag in agendamentos]


@router.post("", status_code=status.HTTP_201_CREATED)
def cadastrar_agendamento(
    dados: AgendamentoPayload,
    db: Session = Depends(get_db),
    usuario_atual: dict = Depends(obter_usuario_logado),
):
    if usuario_atual.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Apenas administradores podem agendar aulas.")

    id_aluno = int(dados.alunoId or dados.id_aluno or 0)
    id_professor = int(dados.professorId or dados.id_professor or 0)
    if not id_aluno or not id_professor:
        raise HTTPException(status_code=400, detail="Selecione um aluno e um professor válidos.")

    admin_id = None
    if usuario_atual.get("sub") and str(usuario_atual["sub"]).isdigit():
        adm = db.query(AdministradorModel).filter(
            AdministradorModel.id_administrador == int(usuario_atual["sub"])
        ).first()
        if adm:
            admin_id = adm.id_administrador

    novo_ag = AgendamentoModel(
        instrumento=dados.instrumento.strip() or "Aula",
        dia=_dia_para_date(dados.dia),
        horario=_hora_para_time(dados.hora or dados.horario),
        id_aluno=id_aluno,
        id_professor=id_professor,
        id_administrador=admin_id,
    )
    db.add(novo_ag)
    db.commit()
    db.refresh(novo_ag)
    return _serializar_agendamento(novo_ag)


@router.put("/{agendamento_id}")
def atualizar_agendamento(
    agendamento_id: int,
    dados: AgendamentoPayload,
    db: Session = Depends(get_db),
    usuario_atual: dict = Depends(obter_usuario_logado),
):
    if usuario_atual.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Acesso negado.")

    ag = db.query(AgendamentoModel).filter(AgendamentoModel.id_agendamento == agendamento_id).first()
    if not ag:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado.")

    ag.instrumento = dados.instrumento.strip() or ag.instrumento
    ag.dia = _dia_para_date(dados.dia)
    ag.horario = _hora_para_time(dados.hora or dados.horario)
    ag.id_aluno = int(dados.alunoId or dados.id_aluno or ag.id_aluno)
    ag.id_professor = int(dados.professorId or dados.id_professor or ag.id_professor)

    db.commit()
    db.refresh(ag)
    return _serializar_agendamento(ag)


@router.delete("/{agendamento_id}", status_code=status.HTTP_204_NO_CONTENT)
def excluir_agendamento(
    agendamento_id: int,
    db: Session = Depends(get_db),
    usuario_atual: dict = Depends(obter_usuario_logado),
):
    if usuario_atual.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Acesso negado.")

    ag = db.query(AgendamentoModel).filter(AgendamentoModel.id_agendamento == agendamento_id).first()
    if not ag:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado.")

    db.delete(ag)
    db.commit()