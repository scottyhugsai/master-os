from pydantic import BaseModel
from typing import Optional, Dict, Any
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

class ProjectResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    address: Optional[str]
    status: str
    budget: float
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

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

class QuoteResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    amount: float
    status: str
    project_id: Optional[int]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

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

class CrewResponse(BaseModel):
    id: int
    name: str
    role: str
    email: Optional[str]
    phone: Optional[str]
    project_id: Optional[int]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Photo Schemas
class PhotoCreate(BaseModel):
    url: str
    description: Optional[str] = None
    project_id: Optional[int] = None

class PhotoUpdate(BaseModel):
    url: Optional[str] = None
    description: Optional[str] = None
    project_id: Optional[int] = None

class PhotoResponse(BaseModel):
    id: int
    url: str
    description: Optional[str]
    project_id: Optional[int]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Invoice Schemas
class InvoiceCreate(BaseModel):
    number: str
    amount: float
    status: str = "draft"
    project_id: Optional[int] = None
    due_date: Optional[datetime] = None

class InvoiceUpdate(BaseModel):
    number: Optional[str] = None
    amount: Optional[float] = None
    status: Optional[str] = None
    project_id: Optional[int] = None
    due_date: Optional[datetime] = None

class InvoiceResponse(BaseModel):
    id: int
    number: str
    amount: float
    status: str
    project_id: Optional[int]
    due_date: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# User Schemas
class UserUpdate(BaseModel):
    company_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    email: str
    company_name: Optional[str]
    phone: Optional[str]
    address: Optional[str]
    city: Optional[str]
    state: Optional[str]
    zip_code: Optional[str]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Receipt/Audit Trail Schemas
class ReceiptCreate(BaseModel):
    action_type: str
    entity_type: str
    entity_id: int
    entity_name: Optional[str] = None
    user_id: int
    user_name: Optional[str] = None
    details: Optional[Dict[str, Any]] = None


class ReceiptResponse(BaseModel):
    id: int
    action_type: str
    entity_type: str
    entity_id: int
    entity_name: Optional[str]
    user_id: int
    user_name: Optional[str]
    timestamp: datetime
    details: Optional[Dict[str, Any]]
    
    class Config:
        from_attributes = True

