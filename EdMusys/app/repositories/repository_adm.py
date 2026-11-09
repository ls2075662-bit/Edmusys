from sqlalchemy.orm import Session
from app.models.db_models import AlunoModel, ProfessorModel
from app.models.aluno import AlunoCreate
from app.models.professor import ProfessorCreate
from app.core.security import gerar_hash_senha
from typing import List
from app.models.db_models import AdministradorModel
from app.models.admin import AdminCreate

class RepositoryAdm:
    # --- ALUNOS ---
    def buscar_alunos(self, db: Session) -> List[AlunoModel]:
        return db.query(AlunoModel).all()

    def salvar_aluno(self, db: Session, aluno: AlunoCreate) -> AlunoModel:
        db_aluno = AlunoModel(
            nome=aluno.nome,
            telefone=aluno.telefone,
            email=aluno.email,
            cpf=aluno.cpf,
            instrumento=aluno.instrumento,
            dias_disponiveis=aluno.diasDisponiveis,
            horarios_disponiveis=aluno.horariosDisponiveis,
            plano=aluno.plano,
            data_nascimento=aluno.dataNascimento,
            senha_hash=gerar_hash_senha(aluno.senha)
        )
        db.add(db_aluno)
        db.commit()
        db.refresh(db_aluno)
        return db_aluno

    # --- PROFESSORES ---
    def buscar_professores(self, db: Session) -> List[ProfessorModel]:
        return db.query(ProfessorModel).all()

    def salvar_professor(self, db: Session, prof: ProfessorCreate) -> ProfessorModel:
        db_prof = ProfessorModel(
            nome=prof.nome,
            telefone=prof.telefone,
            email=prof.email,
            cpf=prof.cpf,
            especialidade=prof.especialidade,
            dias_disponiveis=prof.diasDisponiveis,
            horarios_disponiveis=prof.horariosDisponiveis,
            plano=prof.plano,
            data_nascimento=prof.dataNascimento,
            senha_hash=gerar_hash_senha(prof.senha)
        )
        db.add(db_prof)
        db.commit()
        db.refresh(db_prof)
        return db_prof
    
    def salvar_admin(self, db: Session, admin: AdminCreate) -> AdministradorModel:
        db_admin = AdministradorModel(
            nome=admin.nome,
            email=admin.email,
            cpf=admin.cpf,
            senha_hash=gerar_hash_senha(admin.senha)
    )
        db.add(db_admin)
        db.commit()
        db.refresh(db_admin)
        return db_admin
