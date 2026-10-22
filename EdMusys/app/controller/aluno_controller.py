from fastapi import APIRouter
from app.models.aluno import Aluno
from app.services.aluno_service import AlunoService
from typing import List

router = APIRouter(prefix="/api/alunos", tags=["Alunos"])
aluno_service = AlunoService()

@router.get("", response_model=List[Aluno])
def listar():
    return aluno_service.listar_todos()

@router.post("")
def cadastrar(aluno: Aluno):
    return aluno_service.salvar(aluno)