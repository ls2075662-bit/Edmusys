from pydantic import BaseModel
from datetime import date
from typing import Optional

class Professor(BaseModel):
    nome: str
    telefone: str
    email: str
    cpf: str
    especialidade: str
    diasDisponiveis: Optional[str] = None
    horariosDisponiveis: Optional[str] = None
    plano: Optional[str] = None
    dataNascimento: Optional[date] = None