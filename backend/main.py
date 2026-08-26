from contextlib import asynccontextmanager

from fastapi import FastAPI

from backend.database.base import Base  # noqa: F401 - imports all models before create_all
from backend.database.connection import engine
from backend.routes.health import router as health_router
from backend.routes.patients import router as patients_router
from backend.routes.prescriptions import router as prescriptions_router
from backend.routes.medications import router as medications_router
from backend.routes.medication_logs import router as medication_logs_router
from backend.routes.alert import router as alert_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="Tabu-Call API",
    description="Backend API for the Tabu-Call application",
    version="1.0.0",
    lifespan=lifespan,
)


@app.get("/")
def home():
    return {"message": "Tabu-Call Backend is running!"}


app.include_router(health_router)
app.include_router(patients_router)
app.include_router(prescriptions_router)
app.include_router(medications_router)
app.include_router(medication_logs_router)
app.include_router(alert_router)