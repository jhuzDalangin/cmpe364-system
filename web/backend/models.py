from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from database import Base

class Record(Base):
    __tablename__ = "records"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="open",
    )
     