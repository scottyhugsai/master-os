"""
Seed endpoint for Master OS API.
Provides /api/seed endpoint that populates SQLite with realistic sample data.
"""
from fastapi import APIRouter, HTTPException, status
from database import SessionLocal, init_db, User, Project, Quote, Crew, Invoice
from datetime import datetime, timedelta
import hashlib
import json

router = APIRouter(prefix="/api", tags=["seed"])


def hash_password(password: str) -> str:
    """Hash a password (simple sha256 for seeding)."""
    return hashlib.sha256(password.encode()).hexdigest()


@router.post("/seed")
def seed_database():
    """
    Seed the database with realistic sample data.
    
    Creates:
    - 1 user
    - 5 projects (at various stages)
    - 3 crew members (roofing/construction contractors)
    - 8 quotes (roofing jobs with realistic amounts)
    - 4 invoices (various statuses)
    
    Returns: Seeded data structure with all created entities
    """
    # Initialize database
    init_db()
    db = SessionLocal()
    
    try:
        # Clear existing data
        db.query(Invoice).delete()
        db.query(Quote).delete()
        db.query(Crew).delete()
        db.query(Project).delete()
        db.query(User).delete()
        
        # Create a user
        user = User(
            email="scotty@example.com",
            username="scottyhugs",
            full_name="Scotty Hughes",
            hashed_password=hash_password("secure_password_123"),
            is_active=True,
            company_name="Master Roofing & Construction",
            phone="555-0001",
            address="123 Contractor Lane",
            city="Austin",
            state="TX",
            zip_code="78701",
            created_at=datetime.utcnow()
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
        # Create 5 projects (at various stages)
        projects = [
            {
                "name": "Downtown Office Building - Roof Replacement",
                "description": "Complete roof replacement of 15-story commercial building. Weather-resistant asphalt shingles, structural reinforcement.",
                "address": "401 Main St, Austin, TX 78701",
                "status": "in_progress",
                "budget": 85000.00,
                "user_id": user.id,
            },
            {
                "name": "Residential Storm Damage Repair",
                "description": "Post-hurricane roof repair and restoration. Comprehensive damage assessment and repair.",
                "address": "2847 Oak Ave, Austin, TX 78722",
                "status": "quoted",
                "budget": 18000.00,
                "user_id": user.id,
            },
            {
                "name": "Shopping Center Metal Roof Installation",
                "description": "Large commercial metal roof installation. 4,200 sq ft standing seam system with energy-efficient coating.",
                "address": "5500 Lamar Blvd, Austin, TX 78723",
                "status": "completed",
                "budget": 95000.00,
                "user_id": user.id,
            },
            {
                "name": "Historic Building Slate Roof Restoration",
                "description": "Preservation work on heritage property. Slate roof restoration with copper flashing and structural repairs.",
                "address": "612 Congress Ave, Austin, TX 78701",
                "status": "pending",
                "budget": 125000.00,
                "user_id": user.id,
            },
            {
                "name": "Multi-Family Residential Complex Gutter System",
                "description": "Seamless aluminum gutter installation for 6-unit residential complex. Includes downspouts, guards, and maintenance plan.",
                "address": "1200 Barton Hills Dr, Austin, TX 78704",
                "status": "in_progress",
                "budget": 22000.00,
                "user_id": user.id,
            },
        ]
        
        db_projects = []
        for proj_data in projects:
            project = Project(
                name=proj_data["name"],
                description=proj_data["description"],
                address=proj_data["address"],
                status=proj_data["status"],
                budget=proj_data["budget"],
                user_id=proj_data["user_id"],
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.add(project)
            db_projects.append(project)
        
        db.commit()
        for proj in db_projects:
            db.refresh(proj)
        
        # Create 3 crew members (realistic contractor data)
        crew_members = [
            {
                "name": "Marcus Johnson",
                "role": "Lead Roofer",
                "email": "marcus.johnson@masterroofing.com",
                "phone": "555-0101",
                "project_id": db_projects[0].id,
            },
            {
                "name": "David Chen",
                "role": "General Contractor",
                "email": "david.chen@masterroofing.com",
                "phone": "555-0102",
                "project_id": db_projects[1].id,
            },
            {
                "name": "Sarah Mitchell",
                "role": "Project Supervisor",
                "email": "sarah.mitchell@masterroofing.com",
                "phone": "555-0103",
                "project_id": db_projects[2].id,
            },
        ]
        
        db_crew = []
        for crew_data in crew_members:
            crew = Crew(
                name=crew_data["name"],
                role=crew_data["role"],
                email=crew_data["email"],
                phone=crew_data["phone"],
                project_id=crew_data["project_id"],
                created_at=datetime.utcnow()
            )
            db.add(crew)
            db_crew.append(crew)
        
        db.commit()
        for c in db_crew:
            db.refresh(c)
        
        # Create 8 quotes (roofing jobs with realistic amounts)
        quotes = [
            {
                "title": "Roof Replacement - Asphalt Shingles",
                "description": "Complete roof replacement with GAF Timberline HD asphalt shingles, includes underlayment and flashing. 2,500 sq ft residential roof.",
                "amount": 15000.00,
                "status": "pending",
                "project_id": db_projects[0].id,
            },
            {
                "title": "Roof Repair - Storm Damage",
                "description": "Emergency roof repair following hail storm. Replacement of damaged shingles and structural assessment.",
                "amount": 4500.00,
                "status": "accepted",
                "project_id": db_projects[1].id,
            },
            {
                "title": "Metal Roof Installation",
                "description": "Premium standing seam metal roof installation. Commercial property, 4,200 sq ft. Includes all hardware and ventilation.",
                "amount": 32000.00,
                "status": "accepted",
                "project_id": db_projects[2].id,
            },
            {
                "title": "Flat Roof - TPO Membrane",
                "description": "TPO single-ply membrane installation on 3,800 sq ft commercial flat roof with energy-efficient white coating.",
                "amount": 18500.00,
                "status": "quoted",
                "project_id": db_projects[3].id,
            },
            {
                "title": "Slate Roof Restoration",
                "description": "Historic slate roof restoration with copper flashing. Includes structural repairs and preservation treatment.",
                "amount": 48000.00,
                "status": "pending",
                "project_id": db_projects[4].id,
            },
            {
                "title": "Gutter Installation and Repair",
                "description": "Seamless aluminum gutter installation with downspouts and leaf guards. 340 linear feet.",
                "amount": 3200.00,
                "status": "quoted",
                "project_id": db_projects[0].id,
            },
            {
                "title": "Roof Inspection and Maintenance",
                "description": "Comprehensive roof inspection, assessment, and preventative maintenance package. Annual service plan.",
                "amount": 1500.00,
                "status": "accepted",
                "project_id": db_projects[1].id,
            },
            {
                "title": "Skylight Installation and Repairs",
                "description": "Installation of 4 premium skylights with solar heat gain reduction. Includes flashing and sealant warranty.",
                "amount": 8900.00,
                "status": "quoted",
                "project_id": db_projects[2].id,
            },
        ]
        
        db_quotes = []
        for quote_data in quotes:
            quote = Quote(
                title=quote_data["title"],
                description=quote_data["description"],
                amount=quote_data["amount"],
                status=quote_data["status"],
                project_id=quote_data["project_id"],
                created_at=datetime.utcnow()
            )
            db.add(quote)
            db_quotes.append(quote)
        
        db.commit()
        for q in db_quotes:
            db.refresh(q)
        
        # Create 4 invoices
        invoices = [
            {
                "invoice_number": "INV-2026-001",
                "amount": 15000.00,
                "status": "issued",
                "due_date": datetime.utcnow() + timedelta(days=30),
                "project_id": db_projects[0].id,
            },
            {
                "invoice_number": "INV-2026-002",
                "amount": 32000.00,
                "status": "paid",
                "due_date": datetime.utcnow() - timedelta(days=15),
                "project_id": db_projects[2].id,
            },
            {
                "invoice_number": "INV-2026-003",
                "amount": 4500.00,
                "status": "issued",
                "due_date": datetime.utcnow() + timedelta(days=20),
                "project_id": db_projects[1].id,
            },
            {
                "invoice_number": "INV-2026-004",
                "amount": 18500.00,
                "status": "draft",
                "due_date": datetime.utcnow() + timedelta(days=45),
                "project_id": db_projects[3].id,
            },
        ]
        
        db_invoices = []
        for inv_data in invoices:
            invoice = Invoice(
                invoice_number=inv_data["invoice_number"],
                amount=inv_data["amount"],
                status=inv_data["status"],
                due_date=inv_data["due_date"],
                project_id=inv_data["project_id"],
                created_at=datetime.utcnow()
            )
            db.add(invoice)
            db_invoices.append(invoice)
        
        db.commit()
        for inv in db_invoices:
            db.refresh(inv)
        
        # Prepare response data
        seed_data = {
            "success": True,
            "message": "Database seeded successfully",
            "data": {
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username,
                    "full_name": user.full_name,
                    "company_name": user.company_name,
                    "is_active": user.is_active,
                    "created_at": user.created_at.isoformat() if user.created_at else None,
                },
                "projects": [
                    {
                        "id": p.id,
                        "name": p.name,
                        "description": p.description,
                        "address": p.address,
                        "status": p.status,
                        "budget": p.budget,
                        "user_id": p.user_id,
                        "created_at": p.created_at.isoformat() if p.created_at else None,
                        "updated_at": p.updated_at.isoformat() if p.updated_at else None,
                    }
                    for p in db_projects
                ],
                "crew": [
                    {
                        "id": c.id,
                        "name": c.name,
                        "role": c.role,
                        "email": c.email,
                        "phone": c.phone,
                        "project_id": c.project_id,
                        "created_at": c.created_at.isoformat() if c.created_at else None,
                    }
                    for c in db_crew
                ],
                "quotes": [
                    {
                        "id": q.id,
                        "title": q.title,
                        "description": q.description,
                        "amount": q.amount,
                        "status": q.status,
                        "project_id": q.project_id,
                        "created_at": q.created_at.isoformat() if q.created_at else None,
                    }
                    for q in db_quotes
                ],
                "invoices": [
                    {
                        "id": inv.id,
                        "invoice_number": inv.invoice_number,
                        "amount": inv.amount,
                        "status": inv.status,
                        "due_date": inv.due_date.isoformat() if inv.due_date else None,
                        "project_id": inv.project_id,
                        "created_at": inv.created_at.isoformat() if inv.created_at else None,
                    }
                    for inv in db_invoices
                ],
            },
            "summary": {
                "users_created": 1,
                "projects_created": len(db_projects),
                "crew_created": len(db_crew),
                "quotes_created": len(db_quotes),
                "invoices_created": len(db_invoices),
            }
        }
        
        return seed_data
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error seeding database: {str(e)}"
        )
    finally:
        db.close()


@router.get("/seed/status")
def seed_status():
    """Get the current status of seed data in the database."""
    db = SessionLocal()
    try:
        projects_count = db.query(Project).count()
        crew_count = db.query(Crew).count()
        quotes_count = db.query(Quote).count()
        invoices_count = db.query(Invoice).count()
        users_count = db.query(User).count()
        
        return {
            "seeded": any([projects_count > 0, crew_count > 0, quotes_count > 0, invoices_count > 0]),
            "counts": {
                "users": users_count,
                "projects": projects_count,
                "crew": crew_count,
                "quotes": quotes_count,
                "invoices": invoices_count,
            }
        }
    finally:
        db.close()
