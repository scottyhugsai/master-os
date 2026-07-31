# Master OS Seed Endpoint - Quick Start

## 🚀 Quick Commands

### 1. Seed the Database
```bash
curl -X POST http://localhost:8000/api/seed
```

### 2. Check What's Been Seeded
```bash
curl http://localhost:8000/api/seed/status
```

### 3. Get All Projects
```bash
curl http://localhost:8000/api/projects
```

### 4. Get All Crew
```bash
curl http://localhost:8000/api/crew
```

### 5. Get All Quotes
```bash
curl http://localhost:8000/api/quotes
```

### 6. Get All Invoices
```bash
curl http://localhost:8000/api/invoices
```

---

## 📊 What Gets Created

Each time you call `/api/seed`, the database is populated with:

- **5 Projects** (various stages: in_progress, quoted, completed, pending)
- **3 Crew Members** (Lead Roofer, General Contractor, Project Supervisor)
- **8 Quotes** (roofing jobs ranging from $1,500 to $48,000)
- **4 Invoices** (statuses: issued, paid, draft)

---

## 📁 Files

**Main Seed Endpoint:**
- `/backend/routers/seed.py` - The seed endpoint implementation

**Documentation:**
- `SEED_DATA_REPORT.md` - Detailed data specifications
- `IMPLEMENTATION_SUMMARY.md` - Technical details
- `API_RESPONSE_EXAMPLES.md` - Full JSON examples
- `verify_seed.sh` - Automated verification

---

## ✅ Verification

Run the verification script:
```bash
./verify_seed.sh
```

Expected output:
```
✅ Projects:  5/5
✅ Crew:      3/3
✅ Quotes:    8/8
✅ Invoices:  4/4
✅ All tests PASSED!
```

---

## 🔄 Reset Database

Just call the seed endpoint again - it clears and repopulates:
```bash
curl -X POST http://localhost:8000/api/seed
```

---

## 💡 Tips

- The endpoint is **idempotent** - safe to call multiple times
- All data is **realistic** - based on actual roofing/construction industry
- All **relationships are maintained** - proper foreign keys
- **No zero values** - all amounts and budgets are populated

---

## 🐛 Troubleshooting

**Server not running?**
```bash
cd ~/Desktop/projects/master-os/backend
python3 main.py
```

**Port 8000 already in use?**
```bash
lsof -i :8000
kill -9 <PID>
```

**Need fresh data?**
```bash
# Just call seed again
curl -X POST http://localhost:8000/api/seed
```

---

## 📋 Sample Data Summary

**Projects:**
- Downtown Office Building - Roof Replacement [$85K - in_progress]
- Residential Storm Damage Repair [$18K - quoted]
- Shopping Center Metal Roof Installation [$95K - completed]
- Historic Building Slate Roof Restoration [$125K - pending]
- Multi-Family Residential Complex Gutter System [$22K - in_progress]

**Crew:**
- Marcus Johnson (Lead Roofer)
- David Chen (General Contractor)
- Sarah Mitchell (Project Supervisor)

**Quotes:** 8 total, $1.5K to $48K

**Invoices:** 4 total, $4.5K to $32K

---

## 🎯 Next Steps

1. Call `POST /api/seed` to populate database
2. Call `GET /api/seed/status` to verify
3. Use other endpoints to retrieve data
4. Build your frontend against populated data
