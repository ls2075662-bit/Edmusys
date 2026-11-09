from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.admin import AdminCreate, AdminResponse
from app.repositories.repository_adm import RepositoryAdm
from app.models.db_models import AdministradorModel

router = APIRouter(prefix="/api/admins", tags=["Administradores"])
repo = RepositoryAdm()

@router.post("", response_model=AdminResponse, status_code=status.HTTP_201_CREATED)
def cadastrar_admin(admin: AdminCreate, db: Session = Depends(get_db)):
    existente = db.query(AdministradorModel).filter(AdministradorModel.email == admin.email).first()
    if existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Já existe um administrador cadastrado com este e-mail."
        )
    return repo.salvar_admin(db, admin)