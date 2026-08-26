from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database.connection import get_db
from backend.models.patient import Patient
from backend.schemas.patient import PatientCreate, PatientResponse

router = APIRouter(prefix="/patients", tags=["Patients"])


@router.get("", response_model=list[PatientResponse])
def get_patients(db: Session = Depends(get_db)):
    return db.query(Patient).all()


@router.post("", response_model=PatientResponse, status_code=201)
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db),
):
    new_patient = Patient(
        name=patient.name,
        age=patient.age,
        phone=patient.phone,
        sensory_mode=patient.sensory_mode,
        status=patient.status,
    )

    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)

    return new_patient