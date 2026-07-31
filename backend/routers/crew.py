from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db, Crew
from models import CrewCreate, CrewUpdate, CrewResponse
from typing import List
from audit import log_audit

router = APIRouter(prefix="/api/crew", tags=["crew"])

@router.post("", response_model=CrewResponse, status_code=201)
def create_crew(crew: CrewCreate, db: Session = Depends(get_db)):
    db_crew = Crew(**crew.model_dump())
    db.add(db_crew)
    db.commit()
    db.refresh(db_crew)
    
    # Log audit trail
    log_audit(
        db=db,
        action_type="crew_created",
        entity_type="crew",
        entity_id=db_crew.id,
        entity_name=db_crew.name,
        user_id=1,
        details={
            "name": db_crew.name,
            "role": db_crew.role,
            "email": db_crew.email,
            "project_id": db_crew.project_id
        }
    )
    
    return db_crew

@router.get("", response_model=List[CrewResponse])
def get_crew(db: Session = Depends(get_db)):
    return db.query(Crew).all()

@router.get("/{crew_id}", response_model=CrewResponse)
def get_crew_member(crew_id: int, db: Session = Depends(get_db)):
    crew = db.query(Crew).filter(Crew.id == crew_id).first()
    if not crew:
        raise HTTPException(status_code=404, detail="Crew member not found")
    return crew

@router.put("/{crew_id}", response_model=CrewResponse)
def update_crew(crew_id: int, crew: CrewUpdate, db: Session = Depends(get_db)):
    db_crew = db.query(Crew).filter(Crew.id == crew_id).first()
    if not db_crew:
        raise HTTPException(status_code=404, detail="Crew member not found")
    
    # Store old values
    old_values = {
        "name": db_crew.name,
        "role": db_crew.role,
        "email": db_crew.email
    }
    
    for key, value in crew.model_dump(exclude_unset=True).items():
        setattr(db_crew, key, value)
    db.commit()
    db.refresh(db_crew)
    
    # Log audit trail
    log_audit(
        db=db,
        action_type="crew_updated",
        entity_type="crew",
        entity_id=db_crew.id,
        entity_name=db_crew.name,
        user_id=1,
        details={
            "previous": old_values,
            "updated": crew.model_dump(exclude_unset=True)
        }
    )
    
    return db_crew

@router.delete("/{crew_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_crew(crew_id: int, db: Session = Depends(get_db)):
    db_crew = db.query(Crew).filter(Crew.id == crew_id).first()
    if not db_crew:
        raise HTTPException(status_code=404, detail="Crew member not found")
    
    # Log audit trail before deletion
    log_audit(
        db=db,
        action_type="crew_deleted",
        entity_type="crew",
        entity_id=db_crew.id,
        entity_name=db_crew.name,
        user_id=1,
        details={
            "name": db_crew.name,
            "role": db_crew.role,
            "email": db_crew.email
        }
    )
    
    db.delete(db_crew)
    db.commit()
