from app.models.aluno import Aluno
from typing import List

class RepositoryAdm:
    def __init__(self):
        self._alunos: List[Aluno] = []

    def buscar_alunos(self) -> List[Aluno]:
        return self._alunos

    def salvar_aluno(self, aluno: Aluno) -> bool:
        self._alunos.append(aluno)
        return True