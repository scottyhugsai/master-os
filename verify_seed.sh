#!/bin/bash
# Master OS API Endpoint Verification Script

BASE_URL="http://localhost:8000"

echo "================================"
echo "Master OS API - Endpoint Tests"
echo "================================"
echo ""

# Test 1: Health check
echo "1. Health Check"
echo "   GET /health"
curl -s $BASE_URL/health | python3 -m json.tool
echo ""

# Test 2: Seed status (before seeding)
echo "2. Seed Status"
echo "   GET /api/seed/status"
curl -s $BASE_URL/api/seed/status | python3 -m json.tool
echo ""

# Test 3: Projects count
echo "3. Projects Count"
echo "   GET /api/projects"
PROJECT_COUNT=$(curl -s $BASE_URL/api/projects | python3 -c 'import sys, json; p = json.load(sys.stdin); print(len(p))')
echo "   Total projects: $PROJECT_COUNT"
if [ "$PROJECT_COUNT" -eq 5 ]; then echo "   ✅ PASS"; else echo "   ❌ FAIL"; fi
echo ""

# Test 4: Crew count
echo "4. Crew Members Count"
echo "   GET /api/crew"
CREW_COUNT=$(curl -s $BASE_URL/api/crew | python3 -c 'import sys, json; c = json.load(sys.stdin); print(len(c))')
echo "   Total crew: $CREW_COUNT"
if [ "$CREW_COUNT" -eq 3 ]; then echo "   ✅ PASS"; else echo "   ❌ FAIL"; fi
echo ""

# Test 5: Quotes count
echo "5. Quotes Count"
echo "   GET /api/quotes"
QUOTES_COUNT=$(curl -s $BASE_URL/api/quotes | python3 -c 'import sys, json; q = json.load(sys.stdin); print(len(q))')
echo "   Total quotes: $QUOTES_COUNT"
if [ "$QUOTES_COUNT" -eq 8 ]; then echo "   ✅ PASS"; else echo "   ❌ FAIL"; fi
echo ""

# Test 6: Invoices count
echo "6. Invoices Count"
echo "   GET /api/invoices"
INVOICES_COUNT=$(curl -s $BASE_URL/api/invoices | python3 -c 'import sys, json; i = json.load(sys.stdin); print(len(i))')
echo "   Total invoices: $INVOICES_COUNT"
if [ "$INVOICES_COUNT" -eq 4 ]; then echo "   ✅ PASS"; else echo "   ❌ FAIL"; fi
echo ""

echo "================================"
echo "Summary"
echo "================================"
echo "Projects:  $PROJECT_COUNT/5"
echo "Crew:      $CREW_COUNT/3"
echo "Quotes:    $QUOTES_COUNT/8"
echo "Invoices:  $INVOICES_COUNT/4"
echo ""

if [ "$PROJECT_COUNT" -eq 5 ] && [ "$CREW_COUNT" -eq 3 ] && [ "$QUOTES_COUNT" -eq 8 ] && [ "$INVOICES_COUNT" -eq 4 ]; then
  echo "✅ All tests PASSED!"
else
  echo "❌ Some tests FAILED!"
fi
