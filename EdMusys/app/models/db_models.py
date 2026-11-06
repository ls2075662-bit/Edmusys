from sqlalchemy import Column, Integer, String, Date
from app.database import Base

class AdministradorModel(Base):
    __tablename__ = "administradores"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    cpf = Column(String(14), unique=True)
    senha_hash = Column(String(255), nullable=False)

class ProfessorModel(Base):
    __tablename__ = "professores"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    telefone = Column(String(20))
    email = Column(String(100), unique=True, nullable=False, index=True)
    cpf = Column(String(14), unique=True)
    especialidade = Column(String(50))
    dias_disponiveis = Column(String(100))
    horarios_disponiveis = Column(String(100))
    plano = Column(String(50))
    data_nascimento = Column(Date, nullable=True)
    senha_hash = Column(String(255), nullable=False)

class AlunoModel(Base):
    __tablename__ = "alunos"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    telefone = Column(String(20))
    email = Column(String(100), unique=True, nullable=False, index=True)
    cpf = Column(String(14), unique=True)
    instrumento = Column(String(50))
    dias_disponiveis = Column(String(100))
    horarios_disponiveis = Column(String(100))
    plano = Column(String(50))
    data_nascimento = Column(Date, nullable=True)
    senha_hash = Column(String(255), nullable=False)
