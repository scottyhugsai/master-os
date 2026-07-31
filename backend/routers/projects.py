from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db, Project, User
from models import ProjectCreate, ProjectResponse, ProjectUpdate
from typing import List
from audit import log_audit

router = APIRouter(prefix="/api/projects", tags=["projects"])


def get_current_user(db: Session = Depends(get_db)) -> User:
    """Get current user from JWT (placeholder)."""
    # In production, extract from JWT token via Depends(verify_token)
    return None


@router.post("", response_model=ProjectResponse, status_code=201)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db)
):
    """Create a new project."""
    # Verify user exists
    user = db.query(User).filter(User.id == project.user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    db_project = Project(
        name=project.name,
        description=project.description,
        status=project.status,
        budget=project.budget,
        user_id=project.user_id
    )
    
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    
    # Log audit trail
    log_audit(
        db=db,
        action_type="project_created",
        entity_type="project",
        entity_id=db_project.id,
        entity_name=db_project.name,
        user_id=project.user_id,
        user_name=user.username,
        details={
            "name": db_project.name,
            "budget": float(db_project.budget),
            "status": db_project.status
        }
    )
    
    return db_project


@router.get("", response_model=List[ProjectResponse])
def list_projects(
    user_id: int = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """List all projects or filter by user_id."""
    query = db.query(Project)
    
    if user_id:
        query = query.filter(Project.user_id == user_id)
    
    projects = query.offset(skip).limit(limit).all()
    return projects


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    """Get a specific project by ID."""
    project = db.query(Project).filter(Project.id == project_id).first()
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    return project


@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int,
    project_update: ProjectUpdate,
    db: Session = Depends(get_db)
):
    """Update a project."""
    project = db.query(Project).filter(Project.id == project_id).first()
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Store old values for audit trail
    old_values = {
        "name": project.name,
        "status": project.status,
        "budget": float(project.budget)
    }
    
    # Update only provided fields
    update_data = project_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(project, field, value)
    
    db.add(project)
    db.commit()
    db.refresh(project)
    
    # Log audit trail
    user = db.query(User).filter(User.id == project.user_id).first()
    log_audit(
        db=db,
        action_type="project_updated",
        entity_type="project",
        entity_id=project.id,
        entity_name=project.name,
        user_id=project.user_id,
        user_name=user.username if user else None,
        details={
            "previous": old_values,
            "updated": {k: v for k, v in update_data.items()}
        }
    )
    
    return project


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    """Delete a project."""
    project = db.query(Project).filter(Project.id == project_id).first()
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Log audit trail before deletion
    user = db.query(User).filter(User.id == project.user_id).first()
    log_audit(
        db=db,
        action_type="project_deleted",
        entity_type="project",
        entity_id=project.id,
        entity_name=project.name,
        user_id=project.user_id,
        user_name=user.username if user else None,
        details={
            "name": project.name,
            "budget": float(project.budget),
            "status": project.status
        }
    )
    
    db.delete(project)
    db.commit()
