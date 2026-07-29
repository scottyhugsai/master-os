from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional, List


class UserBase(BaseModel):
    """Base user model for creation and updates."""
    email: str
    username: str
    full_name: Optional[str] = None
    is_active: bool = True


class UserCreate(UserBase):
    """User model for creation."""
    password: str


class UserResponse(UserBase):
    """User model for responses."""
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    """JWT token response model."""
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class ProjectBase(BaseModel):
    """Base project model."""
    name: str
    description: Optional[str] = None
    status: str = "active"
    budget: Optional[float] = None


class ProjectCreate(ProjectBase):
    """Project model for creation."""
    user_id: int


class ProjectUpdate(BaseModel):
    """Project model for updates."""
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    budget: Optional[float] = None


class ProjectResponse(ProjectBase):
    """Project model for responses."""
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class QuoteBase(BaseModel):
    """Base quote model."""
    title: str
    description: Optional[str] = None
    amount: float
    status: str = "draft"


class QuoteCreate(QuoteBase):
    """Quote model for creation."""
    project_id: int


class QuoteResponse(QuoteBase):
    """Quote model for responses."""
    id: int
    project_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class CrewBase(BaseModel):
    """Base crew member model."""
    name: str
    role: str
    email: Optional[str] = None
    phone: Optional[str] = None


class CrewCreate(CrewBase):
    """Crew model for creation."""
    project_id: int


class CrewResponse(CrewBase):
    """Crew model for responses."""
    id: int
    project_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class PhotoBase(BaseModel):
    """Base photo model."""
    filename: str
    description: Optional[str] = None
    url: Optional[str] = None


class PhotoCreate(PhotoBase):
    """Photo model for creation."""
    project_id: int


class PhotoResponse(PhotoBase):
    """Photo model for responses."""
    id: int
    project_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class InvoiceBase(BaseModel):
    """Base invoice model."""
    invoice_number: str
    amount: float
    status: str = "draft"
    due_date: Optional[datetime] = None


class InvoiceCreate(InvoiceBase):
    """Invoice model for creation."""
    project_id: int


class InvoiceResponse(InvoiceBase):
    """Invoice model for responses."""
    id: int
    project_id: int
    created_at: datetime

    class Config:
        from_attributes = True
