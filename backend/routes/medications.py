from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database.connection import get_db
from backend.models.medication import Medication
from backend.models.patient import Patient
from backend.models.prescription import Prescription
from backend.schemas.medication import (
    MedicationCreate,
    MedicationResponse,
)

router = APIRouter(
    prefix="/medications",
    tags=["Medications"],
)


@router.get("", response_model=list[MedicationResponse])
def get_medications(db: Session = Depends(get_db)):
    return db.query(Medication).all()


@router.post("", response_model=MedicationResponse, status_code=201)
def create_medication(
    medication: MedicationCreate,
    db: Session = Depends(get_db),
):
    patient = db.query(Patient).filter(
        Patient.id == medication.patient_id
    ).first()

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found",
        )

    if medication.prescription_id is not None:
        prescription = db.query(Prescription).filter(
            Prescription.id == medication.prescription_id
        ).first()

        if not prescription:
            raise HTTPException(
                status_code=404,
                detail="Prescription not found",
            )

    new_medication = Medication(
        prescription_id=medication.prescription_id,
        patient_id=medication.patient_id,
        medicine_name=medication.medicine_name,
        dosage=medication.dosage,
        frequency=medication.frequency,
        timing=medication.timing,
        food_relation=medication.food_relation,
        active=medication.active,
    )

    db.add(new_medication)
    db.commit()
    db.refresh(new_medication)

    return new_medication