from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class ProfessorBase(BaseModel):
    nome: str
    email: str
    cpf: Optional[str] = None
    telefone: Optional[str] = None
    especialidade: Optional[str] = None
    diasDisponiveis: Optional[str] = None
    horariosDisponiveis: Optional[str] = None
    plano: Optional[str] = None
    dataNascimento: Optional[date] = None

class ProfessorCreate(ProfessorBase):
    senha: str

class ProfessorResponse(ProfessorBase):
    id: int

    class Config:
        from_attributes = True
