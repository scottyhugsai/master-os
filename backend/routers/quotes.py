from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db, Quote, User
from models import QuoteCreate, QuoteUpdate, QuoteResponse
from typing import List
from audit import log_audit

router = APIRouter(prefix="/api/quotes", tags=["quotes"])

@router.post("", response_model=QuoteResponse, status_code=201)
def create_quote(quote: QuoteCreate, db: Session = Depends(get_db)):
    db_quote = Quote(**quote.model_dump())
    db.add(db_quote)
    db.commit()
    db.refresh(db_quote)
    
    # Log audit trail
    log_audit(
        db=db,
        action_type="quote_created",
        entity_type="quote",
        entity_id=db_quote.id,
        entity_name=db_quote.title,
        user_id=1,  # Default user
        details={
            "title": db_quote.title,
            "amount": float(db_quote.amount),
            "status": db_quote.status,
            "project_id": db_quote.project_id
        }
    )
    
    return db_quote

@router.get("", response_model=List[QuoteResponse])
def get_quotes(db: Session = Depends(get_db)):
    return db.query(Quote).all()

@router.get("/{quote_id}", response_model=QuoteResponse)
def get_quote(quote_id: int, db: Session = Depends(get_db)):
    quote = db.query(Quote).filter(Quote.id == quote_id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    return quote

@router.put("/{quote_id}", response_model=QuoteResponse)
def update_quote(quote_id: int, quote: QuoteUpdate, db: Session = Depends(get_db)):
    db_quote = db.query(Quote).filter(Quote.id == quote_id).first()
    if not db_quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    # Store old values
    old_values = {
        "title": db_quote.title,
        "amount": float(db_quote.amount),
        "status": db_quote.status
    }
    
    for key, value in quote.model_dump(exclude_unset=True).items():
        setattr(db_quote, key, value)
    db.commit()
    db.refresh(db_quote)
    
    # Log audit trail
    log_audit(
        db=db,
        action_type="quote_updated",
        entity_type="quote",
        entity_id=db_quote.id,
        entity_name=db_quote.title,
        user_id=1,
        details={
            "previous": old_values,
            "updated": quote.model_dump(exclude_unset=True)
        }
    )
    
    return db_quote

@router.delete("/{quote_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_quote(quote_id: int, db: Session = Depends(get_db)):
    db_quote = db.query(Quote).filter(Quote.id == quote_id).first()
    if not db_quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    # Log audit trail before deletion
    log_audit(
        db=db,
        action_type="quote_deleted",
        entity_type="quote",
        entity_id=db_quote.id,
        entity_name=db_quote.title,
        user_id=1,
        details={
            "title": db_quote.title,
            "amount": float(db_quote.amount),
            "status": db_quote.status
        }
    )
    
    db.delete(db_quote)
    db.commit()
