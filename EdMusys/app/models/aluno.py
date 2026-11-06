from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class AlunoBase(BaseModel):
    nome: str
    email: str
    cpf: Optional[str] = None
    telefone: Optional[str] = None
    instrumento: Optional[str] = None
    diasDisponiveis: Optional[str] = None
    horariosDisponiveis: Optional[str] = None
    plano: Optional[str] = None
    dataNascimento: Optional[date] = None

class AlunoCreate(AlunoBase):
    senha: str

class AlunoResponse(AlunoBase):
    id: int

    class Config:
        from_attributes = True
