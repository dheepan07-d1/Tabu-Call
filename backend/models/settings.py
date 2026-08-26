from datetime import datetime
from sqlalchemy import Boolean, DateTime, String
from sqlalchemy.orm import Mapped, mapped_column

from backend.database.connection import Base


class Settings(Base):
    __tablename__ = "settings"

    id: Mapped[int] = mapped_column(primary_key=True, default=1)
    hospital_name: Mapped[str] = mapped_column(String(150), nullable=False, default="Tabu-Call Hospital")
    staff_name: Mapped[str] = mapped_column(String(120), nullable=False, default="Admin")
    caregiver_alerts: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    missed_medication_alerts: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    voice_calls: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    vibration_alerts: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )
