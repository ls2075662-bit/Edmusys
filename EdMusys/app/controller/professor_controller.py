from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.professor import ProfessorCreate, ProfessorResponse
from app.repositories.repository_adm import RepositoryAdm
from app.core.deps import obter_usuario_logado
from typing import List

router = APIRouter(prefix="/api/professores", tags=["Professores"])
repo = RepositoryAdm()

@router.get("", response_model=List[ProfessorResponse])
def listar_professores(db: Session = Depends(get_db)):
    return repo.buscar_professores(db)

@router.post("", response_model=ProfessorResponse, status_code=status.HTTP_201_CREATED)
def cadastrar_professor(
    prof: ProfessorCreate, 
    db: Session = Depends(get_db),
    usuario_atual: dict = Depends(obter_usuario_logado)
):
    if usuario_atual.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Apenas administradores podem cadastrar professores."
        )
    return repo.salvar_professor(db, prof)