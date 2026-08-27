from datetime import datetime
from zoneinfo import ZoneInfo

from sqlalchemy.orm import Session

from backend.models.medication_log import MedicationLog


IST = ZoneInfo("Asia/Kolkata")


def get_due_medication_logs(db: Session):
    now = datetime.now(IST).replace(tzinfo=None)

    return (
        db.query(MedicationLog)
        .filter(
            MedicationLog.status == "pending",
            MedicationLog.scheduled_time <= now,
        )
        .all()
    )


if __name__ == "__main__":
    from backend.database.connection import SessionLocal

    db = SessionLocal()

    try:
        now = datetime.now(IST).replace(tzinfo=None)

        print(f"Current IST: {now}")

        logs = get_due_medication_logs(db)

        print(f"Due medication logs: {len(logs)}")

        for log in logs:
            print(
                f"Log ID: {log.id}, "
                f"Patient ID: {log.patient_id}, "
                f"Medication ID: {log.medication_id}, "
                f"Scheduled: {log.scheduled_time}, "
                f"Status: {log.status}"
            )
    finally:
        db.close()