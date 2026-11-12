from pydantic import BaseModel
from typing import Optional


class AdminBase(BaseModel):
    nome: str
    email: str
    cpf: str


class AdminCreate(AdminBase):
    senha: str


class AdminUpdate(BaseModel):
    nome: Optional[str] = None
    email: Optional[str] = None
    cpf: Optional[str] = None
    senha: Optional[str] = None


class AdminResponse(AdminBase):
    id: int

    class Config:
        from_attributes = True
