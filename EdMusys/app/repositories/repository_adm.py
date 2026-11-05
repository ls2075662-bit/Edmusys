from sqlalchemy.orm import Session
from app.models.db_models import AlunoModel
from app.models.aluno import Aluno as AlunoSchema
from typing import List

class RepositoryAdm:
    def buscar_alunos(self, db: Session) -> List[AlunoModel]:
        return db.query(AlunoModel).all()

    def salvar_aluno(self, db: Session, aluno: AlunoSchema) -> AlunoModel:
        db_aluno = AlunoModel(
            nome=aluno.nome,
            telefone=aluno.telefone,
            email=aluno.email,
            cpf=aluno.cpf,
            instrumento=aluno.instrumento,
            dias_disponiveis=aluno.diasDisponiveis,
            horarios_disponiveis=aluno.horariosDisponiveis,
            plano=aluno.plano,
            data_nascimento=aluno.dataNascimento
        )
        db.add(db_aluno)
        db.commit()
        db.refresh(db_aluno)
        return db_aluno
