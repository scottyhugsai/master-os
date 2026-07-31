"""
Audit logging utility for automatic tracking of CRUD operations.
"""
from sqlalchemy.orm import Session
from database import Receipt
from datetime import datetime
from typing import Optional, Dict, Any


def log_audit(
    db: Session,
    action_type: str,
    entity_type: str,
    entity_id: int,
    entity_name: Optional[str] = None,
    user_id: int = 1,  # Default to admin user if not provided
    user_name: Optional[str] = None,
    details: Optional[Dict[str, Any]] = None
) -> Receipt:
    """
    Create an audit trail entry for a CRUD operation.
    
    Args:
        db: Database session
        action_type: Type of action (e.g., 'project_created', 'quote_updated', 'crew_deleted')
        entity_type: Type of entity affected (e.g., 'project', 'quote', 'crew')
        entity_id: ID of the affected entity
        entity_name: Human-readable name of the entity (optional)
        user_id: ID of user performing the action (defaults to 1)
        user_name: Name of user performing the action (optional)
        details: Additional metadata as JSON (optional)
    
    Returns:
        The created Receipt object
    """
    receipt = Receipt(
        action_type=action_type,
        entity_type=entity_type,
        entity_id=entity_id,
        entity_name=entity_name,
        user_id=user_id,
        user_name=user_name,
        timestamp=datetime.utcnow(),
        details=details or {}
    )
    db.add(receipt)
    db.commit()
    db.refresh(receipt)
    return receipt


def get_audit_stats(db: Session) -> Dict[str, int]:
    """
    Get summary statistics of audit trail entries.
    
    Returns a dict with counts of each action type:
    {
        'created': X,
        'updated': Y,
        'deleted': Z,
        'total': X + Y + Z
    }
    """
    total = db.query(Receipt).count()
    
    created = db.query(Receipt).filter(
        Receipt.action_type.like('%created%')
    ).count()
    
    updated = db.query(Receipt).filter(
        Receipt.action_type.like('%updated%')
    ).count()
    
    deleted = db.query(Receipt).filter(
        Receipt.action_type.like('%deleted%')
    ).count()
    
    return {
        'created': created,
        'updated': updated,
        'deleted': deleted,
        'total': total
    }
