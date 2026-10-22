from pydantic import BaseModel

class Administrador(BaseModel):
    nome: str
    email: str
    cpf: str
    senha: str