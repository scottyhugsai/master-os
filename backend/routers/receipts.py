from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import ReceiptCreate, ReceiptResponse
from database import get_db, Receipt
from sqlalchemy import desc
from audit import get_audit_stats
from typing import Dict

router = APIRouter(
    prefix="/api/receipts",
    tags=["receipts"]
)


@router.get("/stats", response_model=Dict[str, int])
def get_audit_statistics(db: Session = Depends(get_db)):
    """Get audit trail statistics with action counts.
    
    Returns:
    {
        "created": X,
        "updated": Y,
        "deleted": Z,
        "total": X + Y + Z
    }
    """
    return get_audit_stats(db)


@router.get("/action/{action_type}", response_model=list[ReceiptResponse])
def get_receipts_by_action(action_type: str, limit: int = 100, db: Session = Depends(get_db)):
    """Get all receipts for a specific action type."""
    receipts = (
        db.query(Receipt)
        .filter(Receipt.action_type == action_type)
        .order_by(desc(Receipt.timestamp))
        .limit(limit)
        .all()
    )
    return receipts


@router.get("/entity/{entity_type}/{entity_id}", response_model=list[ReceiptResponse])
def get_receipts_for_entity(entity_type: str, entity_id: int, db: Session = Depends(get_db)):
    """Get all receipts for a specific entity."""
    receipts = (
        db.query(Receipt)
        .filter(Receipt.entity_type == entity_type, Receipt.entity_id == entity_id)
        .order_by(desc(Receipt.timestamp))
        .all()
    )
    return receipts


@router.get("", response_model=list[ReceiptResponse])
def get_receipts(limit: int = 100, skip: int = 0, db: Session = Depends(get_db)):
    """Get all receipts/audit trail entries, ordered by most recent first."""
    receipts = db.query(Receipt).order_by(desc(Receipt.timestamp)).limit(limit).offset(skip).all()
    return receipts


@router.get("/{receipt_id}", response_model=ReceiptResponse)
def get_receipt(receipt_id: int, db: Session = Depends(get_db)):
    """Get a specific receipt by ID."""
    receipt = db.query(Receipt).filter(Receipt.id == receipt_id).first()
    if not receipt:
        raise HTTPException(status_code=404, detail="Receipt not found")
    return receipt


@router.post("", response_model=ReceiptResponse)
def create_receipt(receipt: ReceiptCreate, db: Session = Depends(get_db)):
    """Create a new receipt/audit trail entry."""
    db_receipt = Receipt(
        action_type=receipt.action_type,
        entity_type=receipt.entity_type,
        entity_id=receipt.entity_id,
        entity_name=receipt.entity_name,
        user_id=receipt.user_id,
        user_name=receipt.user_name,
        details=receipt.details,
    )
    db.add(db_receipt)
    db.commit()
    db.refresh(db_receipt)
    return db_receipt
