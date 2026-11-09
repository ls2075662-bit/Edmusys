from pydantic import BaseModel, EmailStr
from typing import Optional

class AdminBase(BaseModel):
    nome: str
    email: str
    cpf: Optional[str] = None

class AdminCreate(AdminBase):
    senha: str

class AdminResponse(AdminBase):
    id: int

    class Config:
        from_attributes = True