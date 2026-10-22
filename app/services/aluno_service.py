from app.repositories.repository_adm import RepositoryAdm
from app.models.aluno import Aluno
from typing import List

class AlunoService:
    def __init__(self):
        self.repository = RepositoryAdm()

    def listar_todos(self) -> List[Aluno]:
        return self.repository.buscar_alunos()

    def salvar(self, aluno: Aluno) -> bool:
        if not aluno.nome or not aluno.nome.strip():
            return False
        return self.repository.salvar_aluno(aluno)