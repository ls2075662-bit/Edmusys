from sqlalchemy.orm import Session
from app.models.db_models import AdministradorModel, ProfessorModel, AlunoModel
from app.models.auth import LoginRequest, TokenResponse
from app.core.security import verificar_senha, criar_token_acesso
from fastapi import HTTPException, status

class AuthService:
    def autenticar(self, db: Session, dados_login: LoginRequest) -> TokenResponse:
        email = dados_login.email.strip().lower()
        senha = dados_login.senha

        # 1. Tentar buscar em Administradores
        admin = db.query(AdministradorModel).filter(AdministradorModel.email == email).first()
        if admin and verificar_senha(senha, admin.senha_hash):
            return self._gerar_resposta_token(admin, "admin")

        # 2. Tentar buscar em Professores
        prof = db.query(ProfessorModel).filter(ProfessorModel.email == email).first()
        if prof and verificar_senha(senha, prof.senha_hash):
            return self._gerar_resposta_token(prof, "professor")

        # 3. Tentar buscar em Alunos
        aluno = db.query(AlunoModel).filter(AlunoModel.email == email).first()
        if aluno and verificar_senha(senha, aluno.senha_hash):
            return self._gerar_resposta_token(aluno, "aluno")

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos."
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