from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# No XAMPP o usuário é 'root' e a senha é VAZIA
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:@localhost:3306/edmusys"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
