from datetime import datetime
from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.database.connection import Base


class MedicationLog(Base):
    __tablename__ = "medication_logs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    patient_id: Mapped[int] = mapped_column(ForeignKey("patients.id", ondelete="CASCADE"), nullable=False, index=True)
    medication_id: Mapped[int] = mapped_column(ForeignKey("medications.id", ondelete="CASCADE"), nullable=False, index=True)
    scheduled_time: Mapped[datetime] = mapped_column(DateTime, nullable=False, index=True)
    reminder_mode: Mapped[str] = mapped_column(String(30), nullable=False, default="voice")
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="pending", index=True)
    attempts: Mapped[int] = mapped_column(default=0, nullable=False)
    responded_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    patient = relationship("Patient", back_populates="medication_logs")
    medication = relationship("Medication", back_populates="medication_logs")
    alerts = relationship("Alert", back_populates="medication_log", cascade="all, delete-orphan")
