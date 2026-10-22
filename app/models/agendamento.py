from pydantic import BaseModel

class Agendamento(BaseModel):
    codigo: str
    instrumento: str
    dia: str
    hora: str