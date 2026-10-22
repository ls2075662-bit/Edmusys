from pydantic import BaseModel
from datetime import date
from typing import Optional

class Aluno(BaseModel):
    nome: str
    telefone: str
    email: str
    cpf: str
    instrumento: str
    diasDisponiveis: Optional[str] = None
    horariosDisponiveis: Optional[str] = None
    plano: Optional[str] = None
    dataNascimento: Optional[date] = None