from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controller.aluno_controller import router as aluno_router

app = FastAPI(title="EdMusys API")

# Habilita o CORS para permitir requisições do JavaScript
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(aluno_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8080, reload=True)