from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.auth import LoginRequest, TokenResponse
from app.services.auth_service import AuthService

router = APIRouter(prefix="/api/auth", tags=["Autenticação"])
auth_service = AuthService()

@router.post("/login", response_model=TokenResponse)
def login(dados_login: LoginRequest, db: Session = Depends(get_db)):
    return auth_service.autenticar(db, dados_login)