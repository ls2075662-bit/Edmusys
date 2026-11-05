from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.aluno import Aluno as AlunoSchema
from app.services.aluno_service import AlunoService
from typing import List

router = APIRouter(prefix="/api/alunos", tags=["Alunos"])
aluno_service = AlunoService()

@router.get("")
def listar(db: Session = Depends(get_db)):
    return aluno_service.listar_todos(db)

@router.post("")
def cadastrar(aluno: AlunoSchema, db: Session = Depends(get_db)):
    resultado = aluno_service.salvar(db, aluno)
    if not resultado:
        raise HTTPException(status_code=400, detail="Dados inválidos para cadastro")
    return {"mensagem": "Aluno cadastrado com sucesso!", "id": resultado.id}
