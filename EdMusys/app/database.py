from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Ficheiro de base de dados SQLite local
SQLALCHEMY_DATABASE_URL = "sqlite:///./edmusys.db"
# Para usar MySQL no futuro, bastaria alterar para:
# SQLALCHEMY_DATABASE_URL = "mysql+pymysql://utilizador:senha@localhost:3306/edmusys"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Injeção de dependência para abrir e fechar a conexão por requisição
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()