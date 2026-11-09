from sqlalchemy.orm import Session
from app.repositories.repository_adm import RepositoryAdm
from app.models.aluno import AlunoCreate

class AlunoService:
    def __init__(self):
        self.repository = RepositoryAdm()

    def listar_todos(self, db: Session):
        return self.repository.buscar_alunos(db)

    def salvar(self, db: Session, aluno: AlunoCreate):
        if not aluno.nome or not aluno.nome.strip():
            return None
        return self.repository.salvar_aluno(db, aluno)
