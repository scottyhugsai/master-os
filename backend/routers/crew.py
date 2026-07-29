from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db, Crew
from models import CrewCreate, CrewUpdate

router = APIRouter(prefix="/api/crew", tags=["crew"])

@router.post("")
def create_crew(crew: CrewCreate, db: Session = Depends(get_db)):
    db_crew = Crew(**crew.dict())
    db.add(db_crew)
    db.commit()
    db.refresh(db_crew)
    return db_crew

@router.get("")
def get_crew(db: Session = Depends(get_db)):
    return db.query(Crew).all()

@router.get("/{crew_id}")
def get_crew_member(crew_id: int, db: Session = Depends(get_db)):
    crew = db.query(Crew).filter(Crew.id == crew_id).first()
    if not crew:
        raise HTTPException(status_code=404, detail="Crew member not found")
    return crew

@router.put("/{crew_id}")
def update_crew(crew_id: int, crew: CrewUpdate, db: Session = Depends(get_db)):
    db_crew = db.query(Crew).filter(Crew.id == crew_id).first()
    if not db_crew:
        raise HTTPException(status_code=404, detail="Crew member not found")
    for key, value in crew.dict(exclude_unset=True).items():
        setattr(db_crew, key, value)
    db.commit()
    db.refresh(db_crew)
    return db_crew

@router.delete("/{crew_id}")
def delete_crew(crew_id: int, db: Session = Depends(get_db)):
    db_crew = db.query(Crew).filter(Crew.id == crew_id).first()
    if not db_crew:
        raise HTTPException(status_code=404, detail="Crew member not found")
    db.delete(db_crew)
    db.commit()
    return {"message": "Crew member deleted"}
