import re
from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from app.models.db_models import AdministradorModel, ProfessorModel, AlunoModel
from app.models.auth import LoginRequest, TokenResponse
from app.core.security import verificar_senha, criar_token_acesso
from fastapi import HTTPException, status

class AuthService:
    def autenticar(self, db: Session, dados_login: LoginRequest) -> TokenResponse:
        identificador = dados_login.email.strip().lower()
        cpf_limpo = re.sub(r'\D', '', identificador)
        senha = dados_login.senha

        # 1. Administrador (E-mail ou CPF com/sem mascara)
        admin = db.query(AdministradorModel).filter(
            or_(
                AdministradorModel.email.ilike(identificador),
                AdministradorModel.cpf == identificador,
                func.replace(func.replace(AdministradorModel.cpf, '.', ''), '-', '') == cpf_limpo
            )
        ).first()
        if admin and verificar_senha(senha, admin.senha_hash):
            return self._gerar_resposta_token(admin, "admin")

        # 2. Professor
        prof = db.query(ProfessorModel).filter(
            or_(
                ProfessorModel.email.ilike(identificador),
                ProfessorModel.cpf == identificador,
                func.replace(func.replace(ProfessorModel.cpf, '.', ''), '-', '') == cpf_limpo
            )
        ).first()
        if prof and verificar_senha(senha, prof.senha_hash):
            return self._gerar_resposta_token(prof, "professor")

        # 3. Aluno
        aluno = db.query(AlunoModel).filter(
            or_(
                AlunoModel.email.ilike(identificador),
                AlunoModel.cpf == identificador,
                func.replace(func.replace(AlunoModel.cpf, '.', ''), '-', '') == cpf_limpo
            )
        ).first()
        if aluno and verificar_senha(senha, aluno.senha_hash):
            return self._gerar_resposta_token(aluno, "aluno")

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail, CPF ou senha incorretos."
        )

    def _gerar_resposta_token(self, usuario, role: str) -> TokenResponse:
        payload = {
            "sub": str(usuario.id),
            "email": usuario.email,
            "role": role,
            "nome": usuario.nome
        }
        token = criar_token_acesso(payload)
        return TokenResponse(
            access_token=token,
            role=role,
            user_id=usuario.id,
            nome=usuario.nome,
            email=usuario.email
        )
