from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database.connection import get_db
from backend.models.alert import Alert
from backend.models.patient import Patient
from backend.models.medication_log import MedicationLog
from backend.schemas.alert import AlertCreate, AlertResponse


router = APIRouter(prefix="/alerts", tags=["Alerts"])


@router.post("", response_model=AlertResponse, status_code=201)
def create_alert(alert: AlertCreate, db: Session = Depends(get_db)):
    # Check patient exists
    patient = db.query(Patient).filter(Patient.id == alert.patient_id).first()

    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    # Check medication log if provided
    if alert.medication_log_id is not None:
        medication_log = (
            db.query(MedicationLog)
            .filter(MedicationLog.id == alert.medication_log_id)
            .first()
        )

        if not medication_log:
            raise HTTPException(
                status_code=404,
                detail="Medication log not found",
            )

    new_alert = Alert(
        patient_id=alert.patient_id,
        medication_log_id=alert.medication_log_id,
        type=alert.type,
        message=alert.message,
        status=alert.status,
    )

    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)

    return new_alert


@router.get("", response_model=list[AlertResponse])
def get_alerts(db: Session = Depends(get_db)):
    return db.query(Alert).all()