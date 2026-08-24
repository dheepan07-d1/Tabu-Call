from fastapi import FastAPI
from backend.routes.health import router as health_router

app = FastAPI(
    title="Tabu-Call API",
    description="Backend API for the Tabu-Call application",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "Tabu-Call Backend is running!"
    }


app.include_router(health_router)