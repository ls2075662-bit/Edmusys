from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.controller.aluno_controller import router as aluno_router
import os

app = FastAPI(title="EdMusys API")

# Habilita o CORS para permitir requisições do JavaScript
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Inclui os endpoints da API (Back-end)
app.include_router(aluno_router)

# Caminho absoluto para a pasta view (Front-end)
base_dir = os.path.dirname(os.path.abspath(__file__))
view_dir = os.path.abspath(os.path.join(base_dir, "..", "view"))

# 2. Mapeia as pastas estáticas de CSS e JS
if os.path.exists(view_dir):
    css_dir = os.path.join(view_dir, "css")
    js_dir = os.path.join(view_dir, "js")
    
    if os.path.exists(css_dir):
        app.mount("/css", StaticFiles(directory=css_dir), name="css")
    if os.path.exists(js_dir):
        app.mount("/js", StaticFiles(directory=js_dir), name="js")

# 3. Rota principal (ao acessar http://127.0.0.1:8080/)
@app.get("/")
def read_root():
    homepage = os.path.join(view_dir, "EdMusys-homepage.html")
    if os.path.exists(homepage):
        return FileResponse(homepage)
    return {"mensagem": "API EdMusys rodando com sucesso!"}

# 4. Rota dinâmica para QUALQUER página .html (index.html, cadastro.html, portal_aluno.html, etc.)
@app.get("/{page_name}.html")
def get_html_page(page_name: str):
    file_path = os.path.join(view_dir, f"{page_name}.html")
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="Página não encontrada")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8080, reload=True)
