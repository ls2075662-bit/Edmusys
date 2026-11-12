from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from app.database import Base


class AdministradorModel(Base):
    __tablename__ = "administrador"

    id_administrador = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    cpf = Column(String(14), unique=True, nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    senha_hash = Column("senha", String(255), nullable=False)

    @property
    def id(self):
        return self.id_administrador


class AlunoModel(Base):
    __tablename__ = "aluno"

    id_aluno = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    cpf = Column(String(14), unique=True, nullable=False)
    instrumento = Column(String(50), nullable=False)
    data_nascimento = Column(Date, nullable=False)
    telefone = Column(String(20), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    dias_disponiveis = Column(String(100), nullable=False)
    horarios_disponiveis = Column(String(100), nullable=False)
    plano = Column(String(50), nullable=False)
    senha_hash = Column("senha", String(255), nullable=False)

    @property
    def id(self):
        return self.id_aluno


class ProfessorModel(Base):
    __tablename__ = "professor"

    id_professor = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    cpf = Column(String(14), unique=True, nullable=False)
    especialidade = Column(String(90), nullable=False)
    data_nascimento = Column(Date, nullable=False)
    telefone = Column(String(20), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    dias_disponiveis = Column(String(100), nullable=False)
    horarios_disponiveis = Column(String(100), nullable=False)
    senha_hash = Column("senha", String(255), nullable=False)

    @property
    def id(self):
        return self.id_professor


class AgendamentoModel(Base):
    __tablename__ = "agendamento"

    id_agendamento = Column(Integer, primary_key=True, index=True, autoincrement=True)
    instrumento = Column(String(50), nullable=False)
    dia = Column(Date, nullable=False)
    horario = Column(Time, nullable=False)
    id_professor = Column(Integer, ForeignKey("professor.id_professor"), nullable=False)
    id_aluno = Column(Integer, ForeignKey("aluno.id_aluno"), nullable=False)
    id_administrador = Column(
        Integer,
        ForeignKey("administrador.id_administrador", ondelete="SET NULL"),
        nullable=True,
    )
