from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
import webbrowser
from threading import Timer

from app.database import engine, Base, SessionLocal
from app.models.db_models import AdministradorModel
from app.core.security import gerar_hash_senha

# Imports dos controladores (rotas)
from app.controller.auth_controller import router as auth_router
from app.controller.aluno_controller import router as aluno_router
from app.controller.professor_controller import router as professor_router  # <-- NOVO IMPORT

from app.controller.admin_controller import router as admin_router


# 1. Cria as tabelas na base de dados
Base.metadata.create_all(bind=engine)

# 2. Garante a existência do Administrador Padrão
def criar_admin_padrao():
    db = SessionLocal()
    try:
        admin_existente = db.query(AdministradorModel).filter(AdministradorModel.email == "admin@edmusys.com").first()
        if not admin_existente:
            admin_padrao = AdministradorModel(
                nome="Administrador",
                email="admin@edmusys.com",
                cpf="000.000.000-00",
                senha_hash=gerar_hash_senha("admin123")
            )
            db.add(admin_padrao)
            db.commit()
    finally:
        db.close()

criar_admin_padrao()

app = FastAPI(title="EdMusys API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Registra os Endpoints na API
app.include_router(auth_router)
app.include_router(aluno_router)
app.include_router(professor_router)  # <-- NOVA ROTA REGISTRADA

app.include_router(auth_router)
app.include_router(admin_router)     # <-- Rota de Admins
app.include_router(aluno_router)
app.include_router(professor_router)
# 4. Servir arquivos estáticos (CSS, JS, HTML)
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

    def abrir_navegador():
        webbrowser.open("http://localhost:8080")

    Timer(1.5, abrir_navegador).start()

    print("\n" + "="*50)
    print("🚀 Servidor EdMusys Iniciado!")
    print("👉 Acesse no PC: http://localhost:8080")
    print("="*50 + "\n")

    uvicorn.run("app.main:app", host="0.0.0.0", port=8080, reload=True)
