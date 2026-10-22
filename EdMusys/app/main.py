from fastapi import FastAPI
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

# Inclui os endpoints de API
app.include_router(aluno_router)

# Caminho para a pasta view (Front-end)
base_dir = os.path.dirname(os.path.abspath(__file__))
view_dir = os.path.join(base_dir, "..", "view")

# Mapeia os arquivos estáticos (CSS, JS, HTML)
if os.path.exists(view_dir):
    app.mount("/css", StaticFiles(directory=os.path.join(view_dir, "css")), name="css")
    app.mount("/js", StaticFiles(directory=os.path.join(view_dir, "js")), name="js")

# Rota principal (ao acessar http://127.0.0.1:8080/)
@app.get("/")
def read_root():
    homepage = os.path.join(view_dir, "EdMusys-homepage.html")
    if os.path.exists(homepage):
        return FileResponse(homepage)
    return {"mensagem": "API EdMusys rodando com sucesso!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8080, reload=True)