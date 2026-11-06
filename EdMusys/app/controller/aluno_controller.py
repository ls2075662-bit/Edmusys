from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.aluno import AlunoCreate, AlunoResponse
from app.repositories.repository_adm import RepositoryAdm
from app.core.deps import obter_usuario_logado
from typing import List

router = APIRouter(prefix="/api/alunos", tags=["Alunos"])
repo = RepositoryAdm()

@router.get("", response_model=List[AlunoResponse])
def listar_alunos(db: Session = Depends(get_db)):
    return repo.buscar_alunos(db)

@router.post("", response_model=AlunoResponse, status_code=status.HTTP_201_CREATED)
def cadastrar_aluno(
    aluno: AlunoCreate, 
    db: Session = Depends(get_db),
    usuario_atual: dict = Depends(obter_usuario_logado)
):
    if usuario_atual.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Apenas administradores podem cadastrar alunos."
        )
    return repo.salvar_aluno(db, aluno)
