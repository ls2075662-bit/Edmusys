from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.controller.aluno_controller import router as aluno_router
from app.controller.auth_controller import router as auth_router
from app.database import engine, Base, SessionLocal
from app.models.db_models import AdministradorModel
from app.core.security import gerar_hash_senha
import os

Base.metadata.create_all(bind=engine)

# Criar Admin inicial de teste caso não exista
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

# Endpoints da API
app.include_router(auth_router)
app.include_router(aluno_router)

# Restante das rotas estáticas (view_dir, css, js, html)...
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
    return {"erro": "Página não encontrada"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8080, reload=True)
