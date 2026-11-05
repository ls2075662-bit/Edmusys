from sqlalchemy import Column, Integer, String, Date
from app.database import Base

class AlunoModel(Base):
    __tablename__ = "alunos"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    telefone = Column(String(20))
    email = Column(String(100))
    cpf = Column(String(14))
    instrumento = Column(String(50))
    dias_disponiveis = Column(String(100))
    horarios_disponiveis = Column(String(100))
    plano = Column(String(50))
    data_nascimento = Column(Date, nullable=True)