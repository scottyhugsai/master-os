from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Project Schemas
class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    address: Optional[str] = None
    status: str = "quoted"
    budget: float = 0.0
    user_id: int = 1

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    status: Optional[str] = None
    budget: Optional[float] = None

# Quote Schemas
class QuoteCreate(BaseModel):
    title: str
    description: Optional[str] = None
    amount: float
    status: str = "draft"
    project_id: Optional[int] = None

class QuoteUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    amount: Optional[float] = None
    status: Optional[str] = None
    project_id: Optional[int] = None

# Crew Schemas
class CrewCreate(BaseModel):
    name: str
    role: str
    email: Optional[str] = None
    phone: Optional[str] = None
    project_id: Optional[int] = None

class CrewUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    project_id: Optional[int] = None

# Photo Schemas
class PhotoCreate(BaseModel):
    title: str
    url: str
    project_id: Optional[int] = None

class PhotoUpdate(BaseModel):
    title: Optional[str] = None
    url: Optional[str] = None
    project_id: Optional[int] = None

# Invoice Schemas
class InvoiceCreate(BaseModel):
    invoice_number: str
    amount: float
    status: str = "draft"
    project_id: Optional[int] = None
    due_date: Optional[str] = None

class InvoiceUpdate(BaseModel):
    invoice_number: Optional[str] = None
    amount: Optional[float] = None
    status: Optional[str] = None
    project_id: Optional[int] = None
    due_date: Optional[str] = None

# User Schemas
class UserUpdate(BaseModel):
    company_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip: Optional[str] = None
    country: Optional[str] = None
