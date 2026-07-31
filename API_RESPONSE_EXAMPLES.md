# Master OS API - Seed Endpoint Examples

## Endpoint: POST /api/seed

### Request
```bash
curl -X POST http://localhost:8000/api/seed
```

### Full Response Example

```json
{
    "success": true,
    "message": "Database seeded successfully",
    "data": {
        "user": {
            "id": 1,
            "email": "scotty@example.com",
            "username": "scottyhugs",
            "full_name": "Scotty Hughes",
            "company_name": "Master Roofing & Construction",
            "is_active": true,
            "created_at": "2026-07-31T04:53:22.757994"
        },
        "projects": [
            {
                "id": 1,
                "name": "Downtown Office Building - Roof Replacement",
                "description": "Complete roof replacement of 15-story commercial building. Weather-resistant asphalt shingles, structural reinforcement.",
                "address": "401 Main St, Austin, TX 78701",
                "status": "in_progress",
                "budget": 85000.0,
                "user_id": 1,
                "created_at": "2026-07-31T04:53:22.760690",
                "updated_at": "2026-07-31T04:53:22.760695"
            },
            {
                "id": 2,
                "name": "Residential Storm Damage Repair",
                "description": "Post-hurricane roof repair and restoration. Comprehensive damage assessment and repair.",
                "address": "2847 Oak Ave, Austin, TX 78722",
                "status": "quoted",
                "budget": 18000.0,
                "user_id": 1,
                "created_at": "2026-07-31T04:53:22.760808",
                "updated_at": "2026-07-31T04:53:22.760810"
            },
            {
                "id": 3,
                "name": "Shopping Center Metal Roof Installation",
                "description": "Large commercial metal roof installation. 4,200 sq ft standing seam system with energy-efficient coating.",
                "address": "5500 Lamar Blvd, Austin, TX 78723",
                "status": "completed",
                "budget": 95000.0,
                "user_id": 1,
                "created_at": "2026-07-31T04:53:22.760853",
                "updated_at": "2026-07-31T04:53:22.760855"
            },
            {
                "id": 4,
                "name": "Historic Building Slate Roof Restoration",
                "description": "Preservation work on heritage property. Slate roof restoration with copper flashing and structural repairs.",
                "address": "612 Congress Ave, Austin, TX 78701",
                "status": "pending",
                "budget": 125000.0,
                "user_id": 1,
                "created_at": "2026-07-31T04:53:22.760890",
                "updated_at": "2026-07-31T04:53:22.760892"
            },
            {
                "id": 5,
                "name": "Multi-Family Residential Complex Gutter System",
                "description": "Seamless aluminum gutter installation for 6-unit residential complex. Includes downspouts, guards, and maintenance plan.",
                "address": "1200 Barton Hills Dr, Austin, TX 78704",
                "status": "in_progress",
                "budget": 22000.0,
                "user_id": 1,
                "created_at": "2026-07-31T04:53:22.760928",
                "updated_at": "2026-07-31T04:53:22.760930"
            }
        ],
        "crew": [
            {
                "id": 1,
                "name": "Marcus Johnson",
                "role": "Lead Roofer",
                "email": "marcus.johnson@masterroofing.com",
                "phone": "555-0101",
                "project_id": 1,
                "created_at": "2026-07-31T04:53:22.770577"
            },
            {
                "id": 2,
                "name": "David Chen",
                "role": "General Contractor",
                "email": "david.chen@masterroofing.com",
                "phone": "555-0102",
                "project_id": 2,
                "created_at": "2026-07-31T04:53:22.770631"
            },
            {
                "id": 3,
                "name": "Sarah Mitchell",
                "role": "Project Supervisor",
                "email": "sarah.mitchell@masterroofing.com",
                "phone": "555-0103",
                "project_id": 3,
                "created_at": "2026-07-31T04:53:22.770663"
            }
        ],
        "quotes": [
            {
                "id": 1,
                "title": "Roof Replacement - Asphalt Shingles",
                "description": "Complete roof replacement with GAF Timberline HD asphalt shingles, includes underlayment and flashing. 2,500 sq ft residential roof.",
                "amount": 15000.0,
                "status": "pending",
                "project_id": 1,
                "created_at": "2026-07-31T04:53:22.775371"
            },
            {
                "id": 2,
                "title": "Roof Repair - Storm Damage",
                "description": "Emergency roof repair following hail storm. Replacement of damaged shingles and structural assessment.",
                "amount": 4500.0,
                "status": "accepted",
                "project_id": 2,
                "created_at": "2026-07-31T04:53:22.775435"
            },
            {
                "id": 3,
                "title": "Metal Roof Installation",
                "description": "Premium standing seam metal roof installation. Commercial property, 4,200 sq ft. Includes all hardware and ventilation.",
                "amount": 32000.0,
                "status": "accepted",
                "project_id": 3,
                "created_at": "2026-07-31T04:53:22.775469"
            },
            {
                "id": 4,
                "title": "Flat Roof - TPO Membrane",
                "description": "TPO single-ply membrane installation on 3,800 sq ft commercial flat roof with energy-efficient white coating.",
                "amount": 18500.0,
                "status": "quoted",
                "project_id": 4,
                "created_at": "2026-07-31T04:53:22.775499"
            },
            {
                "id": 5,
                "title": "Slate Roof Restoration",
                "description": "Historic slate roof restoration with copper flashing. Includes structural repairs and preservation treatment.",
                "amount": 48000.0,
                "status": "pending",
                "project_id": 5,
                "created_at": "2026-07-31T04:53:22.775545"
            },
            {
                "id": 6,
                "title": "Gutter Installation and Repair",
                "description": "Seamless aluminum gutter installation with downspouts and leaf guards. 340 linear feet.",
                "amount": 3200.0,
                "status": "quoted",
                "project_id": 1,
                "created_at": "2026-07-31T04:53:22.775594"
            },
            {
                "id": 7,
                "title": "Roof Inspection and Maintenance",
                "description": "Comprehensive roof inspection, assessment, and preventative maintenance package. Annual service plan.",
                "amount": 1500.0,
                "status": "accepted",
                "project_id": 2,
                "created_at": "2026-07-31T04:53:22.775620"
            },
            {
                "id": 8,
                "title": "Skylight Installation and Repairs",
                "description": "Installation of 4 premium skylights with solar heat gain reduction. Includes flashing and sealant warranty.",
                "amount": 8900.0,
                "status": "quoted",
                "project_id": 3,
                "created_at": "2026-07-31T04:53:22.775645"
            }
        ],
        "invoices": [
            {
                "id": 1,
                "invoice_number": "INV-2026-001",
                "amount": 15000.0,
                "status": "issued",
                "due_date": "2026-08-30T04:53:22.780365",
                "project_id": 1,
                "created_at": "2026-07-31T04:53:22.782133"
            },
            {
                "id": 2,
                "invoice_number": "INV-2026-002",
                "amount": 32000.0,
                "status": "paid",
                "due_date": "2026-07-16T04:53:22.780754",
                "project_id": 3,
                "created_at": "2026-07-31T04:53:22.782237"
            },
            {
                "id": 3,
                "invoice_number": "INV-2026-003",
                "amount": 4500.0,
                "status": "issued",
                "due_date": "2026-08-20T04:53:22.781226",
                "project_id": 2,
                "created_at": "2026-07-31T04:53:22.782325"
            },
            {
                "id": 4,
                "invoice_number": "INV-2026-004",
                "amount": 18500.0,
                "status": "draft",
                "due_date": "2026-09-14T04:53:22.781594",
                "project_id": 4,
                "created_at": "2026-07-31T04:53:22.782362"
            }
        ]
    },
    "summary": {
        "users_created": 1,
        "projects_created": 5,
        "crew_created": 3,
        "quotes_created": 8,
        "invoices_created": 4
    }
}
```

---

## Endpoint: GET /api/seed/status

### Request
```bash
curl http://localhost:8000/api/seed/status
```

### Response
```json
{
    "seeded": true,
    "counts": {
        "users": 1,
        "projects": 5,
        "crew": 3,
        "quotes": 8,
        "invoices": 4
    }
}
```

---

## Endpoint: GET /api/projects

### Request
```bash
curl http://localhost:8000/api/projects
```

### Response (Array of 5 projects)
```json
[
    {
        "id": 1,
        "name": "Downtown Office Building - Roof Replacement",
        "description": "Complete roof replacement of 15-story commercial building. Weather-resistant asphalt shingles, structural reinforcement.",
        "address": "401 Main St, Austin, TX 78701",
        "status": "in_progress",
        "budget": 85000.0,
        "user_id": 1,
        "created_at": "2026-07-31T04:53:22.760690",
        "updated_at": "2026-07-31T04:53:22.760695"
    },
    ...
]
```

---

## Endpoint: GET /api/crew

### Request
```bash
curl http://localhost:8000/api/crew
```

### Response (Array of 3 crew members)
```json
[
    {
        "id": 1,
        "name": "Marcus Johnson",
        "role": "Lead Roofer",
        "email": "marcus.johnson@masterroofing.com",
        "phone": "555-0101",
        "project_id": 1,
        "created_at": "2026-07-31T04:53:22.770577",
        "updated_at": "2026-07-31T04:53:22.770940"
    },
    ...
]
```

---

## Endpoint: GET /api/quotes

### Request
```bash
curl http://localhost:8000/api/quotes
```

### Response (Array of 8 quotes)
```json
[
    {
        "id": 1,
        "title": "Roof Replacement - Asphalt Shingles",
        "description": "Complete roof replacement with GAF Timberline HD asphalt shingles, includes underlayment and flashing. 2,500 sq ft residential roof.",
        "amount": 15000.0,
        "status": "pending",
        "project_id": 1,
        "created_at": "2026-07-31T04:53:22.775371",
        "updated_at": "2026-07-31T04:53:22.776126"
    },
    ...
]
```

Total: 8 quotes with amounts ranging from $1,500 to $48,000

---

## Endpoint: GET /api/invoices

### Request
```bash
curl http://localhost:8000/api/invoices
```

### Response (Array of 4 invoices)
```json
[
    {
        "id": 1,
        "invoice_number": "INV-2026-001",
        "amount": 15000.0,
        "status": "issued",
        "due_date": "2026-08-30T04:53:22.780365",
        "project_id": 1,
        "created_at": "2026-07-31T04:53:22.782133",
        "updated_at": "2026-07-31T04:53:22.782692"
    },
    {
        "id": 2,
        "invoice_number": "INV-2026-002",
        "amount": 32000.0,
        "status": "paid",
        "due_date": "2026-07-16T04:53:22.780754",
        "project_id": 3,
        "created_at": "2026-07-31T04:53:22.782237",
        "updated_at": "2026-07-31T04:53:22.782695"
    },
    {
        "id": 3,
        "invoice_number": "INV-2026-003",
        "amount": 4500.0,
        "status": "issued",
        "due_date": "2026-08-20T04:53:22.781226",
        "project_id": 2,
        "created_at": "2026-07-31T04:53:22.782325",
        "updated_at": "2026-07-31T04:53:22.782696"
    },
    {
        "id": 4,
        "invoice_number": "INV-2026-004",
        "amount": 18500.0,
        "status": "draft",
        "due_date": "2026-09-14T04:53:22.781594",
        "project_id": 4,
        "created_at": "2026-07-31T04:53:22.782362",
        "updated_at": "2026-07-31T04:53:22.782697"
    }
]
```

Total: 4 invoices with statuses: issued (2), paid (1), draft (1)

---

## Key Observations

✅ **All endpoint responses contain non-zero data**
- Projects have budgets ranging from $18,000 to $125,000
- Quotes have amounts ranging from $1,500 to $48,000
- Invoices have amounts ranging from $4,500 to $32,000
- All timestamps are properly set
- All relationships are properly maintained

✅ **Data Integrity**
- 5 projects across different statuses
- 3 crew members assigned to projects
- 8 quotes associated with projects
- 4 invoices with various statuses
- All foreign keys properly linked

✅ **Seed Status Endpoint Accuracy**
- Reports correct counts for all entities
- Seeded flag correctly set to true
- Can be used to verify database state
