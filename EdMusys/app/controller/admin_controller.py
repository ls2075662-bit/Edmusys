import re
from typing import Optional
from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.deps import obter_usuario_logado
from app.core.security import decodificar_token, gerar_hash_senha
from app.database import get_db
from app.models.admin import AdminCreate, AdminResponse, AdminUpdate
from app.models.db_models import AdministradorModel, AgendamentoModel
from app.repositories.repository_adm import RepositoryAdm

router = APIRouter(prefix="/api/admins", tags=["Administradores"])
repo = RepositoryAdm()


def _obter_admin_autenticado(
    usuario: dict = Depends(obter_usuario_logado),
    db: Session = Depends(get_db),
) -> AdministradorModel:
    if usuario.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso restrito a administradores.",
        )
    admin_id = int(usuario["sub"]) if str(usuario.get("sub", "")).isdigit() else 0
    admin = db.query(AdministradorModel).filter(
        AdministradorModel.id_administrador == admin_id
    ).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Conta administrativa não encontrada.")
    return admin


@router.get("/status")
def verificar_status_sistema(db: Session = Depends(get_db)):
    """Endpoint público seguro: informa apenas se o banco está virgem (0 admins), sem expor dados."""
    total_admins = db.query(AdministradorModel).count()
    return {
        "sistema_virgem": total_admins == 0,
        "total_admins": total_admins,
    }


@router.post("", response_model=AdminResponse, status_code=status.HTTP_201_CREATED)
def cadastrar_admin(
    admin: AdminCreate,
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(default=None),
):
    total_admins = db.query(AdministradorModel).count()

    # Se já existir 1 ou mais administradores, bloqueia qualquer cadastro público não autenticado
    if total_admins > 0:
        token = authorization.replace("Bearer ", "").strip() if authorization else ""
        payload = decodificar_token(token) if token else None
        if not payload or payload.get("role") != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="O sistema já possui administrador cadastrado. Cadastro público bloqueado.",
            )

    cpf_limpo = re.sub(r"\D", "", admin.cpf or "")
    if len(cpf_limpo) != 11:
        raise HTTPException(status_code=400, detail="Informe um CPF válido com 11 dígitos.")
    if len(admin.senha) < 8:
        raise HTTPException(status_code=400, detail="A senha deve ter no mínimo 8 caracteres.")

    if db.query(AdministradorModel).filter(
        AdministradorModel.email.ilike(admin.email.strip())
    ).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Já existe um administrador cadastrado com este e-mail.",
        )

    if db.query(AdministradorModel).filter(
        func.replace(func.replace(AdministradorModel.cpf, ".", ""), "-", "") == cpf_limpo
    ).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Já existe um administrador cadastrado com este CPF.",
        )

    return repo.salvar_admin(db, admin)


@router.get("/me", response_model=AdminResponse)
def obter_minha_conta(admin: AdministradorModel = Depends(_obter_admin_autenticado)):
    return admin


@router.put("/me", response_model=AdminResponse)
def atualizar_minha_conta(
    dados: AdminUpdate,
    db: Session = Depends(get_db),
    admin: AdministradorModel = Depends(_obter_admin_autenticado),
):
    if dados.nome and dados.nome.strip():
        admin.nome = dados.nome.strip()

    if dados.email and dados.email.strip():
        email_novo = dados.email.strip()
        email_em_uso = db.query(AdministradorModel).filter(
            AdministradorModel.email.ilike(email_novo),
            AdministradorModel.id_administrador != admin.id_administrador,
        ).first()
        if email_em_uso:
            raise HTTPException(status_code=400, detail="Este e-mail já está em uso por outra conta.")
        admin.email = email_novo

    if dados.cpf and dados.cpf.strip():
        cpf_limpo = re.sub(r"\D", "", dados.cpf)
        if len(cpf_limpo) != 11:
            raise HTTPException(status_code=400, detail="CPF inválido.")
        cpf_em_uso = db.query(AdministradorModel).filter(
            func.replace(func.replace(AdministradorModel.cpf, ".", ""), "-", "") == cpf_limpo,
            AdministradorModel.id_administrador != admin.id_administrador,
        ).first()
        if cpf_em_uso:
            raise HTTPException(status_code=400, detail="Este CPF já está em uso por outra conta.")
        admin.cpf = dados.cpf.strip()

    if dados.senha:
        if len(dados.senha) < 8:
            raise HTTPException(status_code=400, detail="A nova senha deve ter no mínimo 8 caracteres.")
        admin.senha_hash = gerar_hash_senha(dados.senha)

    db.commit()
    db.refresh(admin)
    return admin


@router.delete("/me")
def excluir_minha_conta(
    db: Session = Depends(get_db),
    admin: AdministradorModel = Depends(_obter_admin_autenticado),
):
    # Desvincula agendamentos criados por este admin antes de excluir a conta
    db.query(AgendamentoModel).filter(
        AgendamentoModel.id_administrador == admin.id_administrador
    ).update({"id_administrador": None})

    db.delete(admin)
    db.commit()

    total_restante = db.query(AdministradorModel).count()
    return {
        "mensagem": "Conta de administrador excluída com sucesso.",
        "sistema_virgem": total_restante == 0,
    }
