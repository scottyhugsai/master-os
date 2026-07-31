"""
Database seeding script for Master OS.
Populates SQLite with sample data:
- 5 projects (mix of active/completed)
- 3 crew members
- 2 quotes
- 1 invoice
- 1 user
"""
import json
from datetime import datetime, timedelta
from database import SessionLocal, init_db, User, Project, Quote, Crew, Invoice
import hashlib

def hash_password(password: str) -> str:
    """Hash a password (simple sha256 for seeding)."""
    return hashlib.sha256(password.encode()).hexdigest()

def seed_database():
    """Seed the database with sample data."""
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
            created_at=datetime.utcnow()
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
        # Create 5 projects (mix of active/completed)
        projects = [
            {
                "name": "Website Redesign",
                "description": "Complete redesign of company website with modern UI/UX",
                "status": "active",
                "budget": 15000.00,
                "user_id": user.id,
            },
            {
                "name": "Mobile App Development",
                "description": "Native iOS and Android app for customer engagement",
                "status": "active",
                "budget": 45000.00,
                "user_id": user.id,
            },
            {
                "name": "E-commerce Platform",
                "description": "Full-stack e-commerce solution with payment integration",
                "status": "completed",
                "budget": 65000.00,
                "user_id": user.id,
            },
            {
                "name": "Cloud Infrastructure",
                "description": "Migration to cloud and setup of CI/CD pipelines",
                "status": "completed",
                "budget": 25000.00,
                "user_id": user.id,
            },
            {
                "name": "API Integration",
                "description": "Third-party API integrations for data synchronization",
                "status": "active",
                "budget": 12000.00,
                "user_id": user.id,
            },
        ]
        
        db_projects = []
        for proj_data in projects:
            project = Project(
                name=proj_data["name"],
                description=proj_data["description"],
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
        
        # Create 3 crew members
        crew_members = [
            {
                "name": "Alice Johnson",
                "role": "Project Manager",
                "email": "alice@example.com",
                "phone": "555-0101",
                "project_id": db_projects[0].id,
            },
            {
                "name": "Bob Smith",
                "role": "Lead Developer",
                "email": "bob@example.com",
                "phone": "555-0102",
                "project_id": db_projects[1].id,
            },
            {
                "name": "Carol Davis",
                "role": "UX/UI Designer",
                "email": "carol@example.com",
                "phone": "555-0103",
                "project_id": db_projects[0].id,
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
        
        # Create 8 quotes with roofing and contractor data
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
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "full_name": user.full_name,
                "is_active": user.is_active,
                "created_at": user.created_at.isoformat() if user.created_at else None,
            },
            "projects": [
                {
                    "id": p.id,
                    "name": p.name,
                    "description": p.description,
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
        }
        
        return seed_data
    
    finally:
        db.close()

if __name__ == "__main__":
    seed_data = seed_database()
    print(json.dumps(seed_data, indent=2))
