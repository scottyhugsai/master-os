from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db, Quote
from models import QuoteCreate, QuoteUpdate

router = APIRouter(prefix="/api/quotes", tags=["quotes"])

@router.post("")
def create_quote(quote: QuoteCreate, db: Session = Depends(get_db)):
    db_quote = Quote(**quote.dict())
    db.add(db_quote)
    db.commit()
    db.refresh(db_quote)
    return db_quote

@router.get("")
def get_quotes(db: Session = Depends(get_db)):
    return db.query(Quote).all()

@router.get("/{quote_id}")
def get_quote(quote_id: int, db: Session = Depends(get_db)):
    quote = db.query(Quote).filter(Quote.id == quote_id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    return quote

@router.put("/{quote_id}")
def update_quote(quote_id: int, quote: QuoteUpdate, db: Session = Depends(get_db)):
    db_quote = db.query(Quote).filter(Quote.id == quote_id).first()
    if not db_quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    for key, value in quote.dict(exclude_unset=True).items():
        setattr(db_quote, key, value)
    db.commit()
    db.refresh(db_quote)
    return db_quote

@router.delete("/{quote_id}")
def delete_quote(quote_id: int, db: Session = Depends(get_db)):
    db_quote = db.query(Quote).filter(Quote.id == quote_id).first()
    if not db_quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    db.delete(db_quote)
    db.commit()
    return {"message": "Quote deleted"}
