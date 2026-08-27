from sqlalchemy.orm import Session

from backend.models.alert import Alert
from backend.models.medication_log import MedicationLog


MAX_ATTEMPTS = 3


def send_reminder(log: MedicationLog) -> bool:
    """
    Send a medication reminder.

    This is currently a placeholder for the Telephony/SMS module.
    """

    print(
        f"Reminder triggered: "
        f"Patient ID={log.patient_id}, "
        f"Medication ID={log.medication_id}, "
        f"Mode={log.reminder_mode}"
    )

    return True


def create_follow_up_alert(
    db: Session,
    log: MedicationLog,
):
    """
    Create an alert after the maximum reminder attempts.
    """

    alert = Alert(
        patient_id=log.patient_id,
        medication_log_id=log.id,
        type="follow_up",
        message="Patient did not respond to medication reminder",
        status="active",
    )

    db.add(alert)
    db.commit()
    db.refresh(alert)

    print(
        f"Alert created: "
        f"Alert ID={alert.id}, "
        f"Patient ID={alert.patient_id}, "
        f"Medication Log ID={alert.medication_log_id}"
    )

    return alert

def process_medication_reminder(
    db: Session,
    log: MedicationLog,
) -> bool:
    """
    Trigger a reminder and update the medication log.
    """

    # Do not process a log that has already reached the alert stage
    if log.status == "alerted":
        print(
            f"Log ID={log.id} is already alerted. "
            "Skipping reminder."
        )
        return False

    success = send_reminder(log)

    if not success:
        return False

    log.attempts += 1

    if log.attempts >= MAX_ATTEMPTS:
        log.status = "alerted"

        db.commit()
        db.refresh(log)

        # Create only one follow-up alert
        existing_alert = (
            db.query(Alert)
            .filter(
                Alert.medication_log_id == log.id,
                Alert.type == "follow_up",
                Alert.status == "active",
            )
            .first()
        )

        if not existing_alert:
            create_follow_up_alert(db, log)

    else:
        log.status = "reminded"

        db.commit()
        db.refresh(log)

    return True