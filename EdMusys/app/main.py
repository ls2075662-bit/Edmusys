from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from datetime import date

from app.database import engine, Base, SessionLocal
from app.models.db_models import AdministradorModel, AlunoModel, ProfessorModel
from app.core.security import gerar_hash_senha

# Imports dos controladores
from app.controller.auth_controller import router as auth_router
from app.controller.admin_controller import router as admin_router
from app.controller.aluno_controller import router as aluno_router
from app.controller.professor_controller import router as professor_router

app = FastAPI(title="EdMusys API")

# Inicialização assíncrona do banco ao subir a aplicação
@app.on_event("startup")
def inicializar_banco():
    try:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()

        # Administrador Padrão
        if not db.query(AdministradorModel).filter(AdministradorModel.email == "admin@edmusys.com").first():
            db.add(AdministradorModel(
                nome="Administrador",
                email="admin@edmusys.com",
                cpf="000.000.000-00",
                senha_hash=gerar_hash_senha("admin123")
            ))

        # Aluno de Teste (Luiz)
        if not db.query(AlunoModel).filter(AlunoModel.email == "luiz@email.com").first():
            db.add(AlunoModel(
                nome="Luiz Pereira",
                email="luiz@email.com",
                cpf="234.567.860-00",
                telefone="54545546546",
                instrumento="Guitarra",
                dias_disponiveis="Segunda, Quinta",
                horarios_disponiveis="18:00, 19:00",
                plano="2",
                data_nascimento=date(2011, 11, 11),
                senha_hash=gerar_hash_senha("00000000")
            ))

        # Professor de Teste (Márcio)
        if not db.query(ProfessorModel).filter(ProfessorModel.email == "marcio34@gmail.com").first():
            db.add(ProfessorModel(
                nome="Márcio Messo",
                email="marcio34@gmail.com",
                cpf="457.665.787-66",
                telefone="87767687687",
                especialidade="Guitarra",
                dias_disponiveis="Segunda, Sexta",
                horarios_disponiveis="18:00, 19:00",
                data_nascimento=date(2000, 9, 22),
                senha_hash=gerar_hash_senha("88888888")
            ))

        db.commit()
        db.close()
    except Exception as err:
        print(f"⚠️ Aviso ao conectar no MySQL: {err}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registar rotas
app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(aluno_router)
app.include_router(professor_router)

# Servir ficheiros estáticos
base_dir = os.path.dirname(os.path.abspath(__file__))
view_dir = os.path.abspath(os.path.join(base_dir, "..", "view"))

if os.path.exists(view_dir):
    css_dir = os.path.join(view_dir, "css")
    js_dir = os.path.join(view_dir, "js")
    if os.path.exists(css_dir):
        app.mount("/css", StaticFiles(directory=css_dir), name="css")
    if os.path.exists(js_dir):
        app.mount("/js", StaticFiles(directory=js_dir), name="js")

@app.get("/")
def read_root():
    homepage = os.path.join(view_dir, "landing_page_edmusys.html")
    if os.path.exists(homepage):
        return FileResponse(homepage)
    return {"mensagem": "API EdMusys rodando com sucesso!"}

@app.get("/{page_name}.html")
def get_html_page(page_name: str):
    file_path = os.path.join(view_dir, f"{page_name}.html")
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="Página não encontrada")

if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*50)
    print("🚀 Servidor EdMusys Iniciado!")
    print("👉 Acesse no PC: http://127.0.0.1:8080")
    print("="*50 + "\n")
    uvicorn.run("app.main:app", host="127.0.0.1", port=8080, reload=True)
