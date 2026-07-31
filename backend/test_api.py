"""
Comprehensive API test suite and verification script.
Tests all GET endpoints and verifies database seeding.
"""
import requests
import json
import time
from datetime import datetime

BASE_URL = "http://localhost:8000"

# Colors for output
GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
BLUE = "\033[94m"
RESET = "\033[0m"

def print_success(msg):
    print(f"{GREEN}✓ {msg}{RESET}")

def print_error(msg):
    print(f"{RED}✗ {msg}{RESET}")

def print_info(msg):
    print(f"{BLUE}ℹ {msg}{RESET}")

def print_warning(msg):
    print(f"{YELLOW}⚠ {msg}{RESET}")

def test_health():
    """Test health check endpoint."""
    print(f"\n{BLUE}=== Testing Health Check ==={RESET}")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print_success(f"Health check passed: {response.json()}")
            return True
        else:
            print_error(f"Health check failed with status {response.status_code}")
            return False
    except Exception as e:
        print_error(f"Health check error: {e}")
        return False

def test_endpoint(name, endpoint, params=None):
    """Test a single endpoint and return response data."""
    print(f"\n{BLUE}Testing: {name}{RESET}")
    try:
        response = requests.get(f"{BASE_URL}{endpoint}", params=params)
        if response.status_code == 200:
            data = response.json()
            print_success(f"{name} returned data")
            print(f"  Status: {response.status_code}")
            print(f"  Records: {len(data) if isinstance(data, list) else 1}")
            return {
                "endpoint": endpoint,
                "status": response.status_code,
                "data": data,
                "count": len(data) if isinstance(data, list) else 1,
            }
        elif response.status_code == 404:
            print_warning(f"{name} returned 404 (expected if empty)")
            return {
                "endpoint": endpoint,
                "status": response.status_code,
                "data": [],
                "count": 0,
            }
        else:
            print_error(f"{name} failed with status {response.status_code}")
            print(f"  Response: {response.text[:200]}")
            return None
    except Exception as e:
        print_error(f"{name} error: {e}")
        return None

def test_projects():
    """Test projects endpoints."""
    print(f"\n{YELLOW}{'='*50}")
    print("TESTING PROJECTS ENDPOINTS")
    print(f"{'='*50}{RESET}")
    
    results = {}
    
    # Get all projects
    result = test_endpoint("GET /api/projects", "/api/projects")
    results["list_projects"] = result
    
    if result and result["count"] > 0:
        # Get first project details
        first_project = result["data"][0]
        project_id = first_project.get("id")
        if project_id:
            result = test_endpoint(f"GET /api/projects/{project_id}", f"/api/projects/{project_id}")
            results["get_project"] = result
    
    return results

def test_quotes():
    """Test quotes endpoints."""
    print(f"\n{YELLOW}{'='*50}")
    print("TESTING QUOTES ENDPOINTS")
    print(f"{'='*50}{RESET}")
    
    results = {}
    
    # Get all quotes
    result = test_endpoint("GET /api/quotes", "/api/quotes")
    results["list_quotes"] = result
    
    if result and result["count"] > 0:
        # Get first quote details
        first_quote = result["data"][0]
        quote_id = first_quote.get("id")
        if quote_id:
            result = test_endpoint(f"GET /api/quotes/{quote_id}", f"/api/quotes/{quote_id}")
            results["get_quote"] = result
    
    return results

def test_crew():
    """Test crew endpoints."""
    print(f"\n{YELLOW}{'='*50}")
    print("TESTING CREW ENDPOINTS")
    print(f"{'='*50}{RESET}")
    
    results = {}
    
    # Get all crew
    result = test_endpoint("GET /api/crew", "/api/crew")
    results["list_crew"] = result
    
    if result and result["count"] > 0:
        # Get first crew member details
        first_crew = result["data"][0]
        crew_id = first_crew.get("id")
        if crew_id:
            result = test_endpoint(f"GET /api/crew/{crew_id}", f"/api/crew/{crew_id}")
            results["get_crew_member"] = result
    
    return results

def test_invoices():
    """Test invoices endpoints."""
    print(f"\n{YELLOW}{'='*50}")
    print("TESTING INVOICES ENDPOINTS")
    print(f"{'='*50}{RESET}")
    
    results = {}
    
    # Get all invoices
    result = test_endpoint("GET /api/invoices", "/api/invoices")
    results["list_invoices"] = result
    
    if result and result["count"] > 0:
        # Get first invoice details
        first_invoice = result["data"][0]
        invoice_id = first_invoice.get("id")
        if invoice_id:
            result = test_endpoint(f"GET /api/invoices/{invoice_id}", f"/api/invoices/{invoice_id}")
            results["get_invoice"] = result
    
    return results

def test_users():
    """Test users endpoints."""
    print(f"\n{YELLOW}{'='*50}")
    print("TESTING USERS ENDPOINTS")
    print(f"{'='*50}{RESET}")
    
    results = {}
    
    # Get user 1 (default user created by seed)
    result = test_endpoint("GET /api/users/1", "/api/users/1")
    results["get_user"] = result
    
    return results

def test_ecosystem():
    """Test ecosystem endpoints."""
    print(f"\n{YELLOW}{'='*50}")
    print("TESTING ECOSYSTEM ENDPOINTS")
    print(f"{'='*50}{RESET}")
    
    results = {}
    
    endpoints = [
        ("GET /api/ecosystem/agents", "/api/ecosystem/agents"),
        ("GET /api/ecosystem/agents/d8c9ae2d8eeb/logs", "/api/ecosystem/agents/d8c9ae2d8eeb/logs"),
        ("GET /api/ecosystem/trading/metrics", "/api/ecosystem/trading/metrics"),
        ("GET /api/ecosystem/trading/positions", "/api/ecosystem/trading/positions"),
        ("GET /api/ecosystem/trading/signals", "/api/ecosystem/trading/signals"),
        ("GET /api/ecosystem/operations/queue", "/api/ecosystem/operations/queue"),
        ("GET /api/ecosystem/notifications", "/api/ecosystem/notifications"),
        ("GET /api/ecosystem/dashboard/summary", "/api/ecosystem/dashboard/summary"),
    ]
    
    for name, endpoint in endpoints:
        result = test_endpoint(name, endpoint)
        results[name.replace("GET /api/ecosystem/", "")] = result
    
    return results

def run_all_tests():
    """Run all test suites."""
    print(f"\n{BLUE}{'='*60}")
    print("MASTER OS API COMPREHENSIVE TEST SUITE")
    print(f"{'='*60}{RESET}")
    print(f"Timestamp: {datetime.utcnow().isoformat()}")
    print(f"Base URL: {BASE_URL}")
    
    # Check if server is running
    try:
        requests.get(f"{BASE_URL}/health", timeout=2)
    except:
        print_error("Server is not responding. Please start the backend server on localhost:8000")
        return None
    
    all_results = {}
    
    # Run health check
    health_ok = test_health()
    all_results["health_check"] = health_ok
    
    if not health_ok:
        print_error("Health check failed. Cannot continue.")
        return all_results
    
    # Run all test suites
    all_results["projects"] = test_projects()
    all_results["quotes"] = test_quotes()
    all_results["crew"] = test_crew()
    all_results["invoices"] = test_invoices()
    all_results["users"] = test_users()
    all_results["ecosystem"] = test_ecosystem()
    
    # Print summary
    print(f"\n{BLUE}{'='*60}")
    print("TEST SUMMARY")
    print(f"{'='*60}{RESET}")
    
    total_tests = sum(1 for v in all_results.values() if isinstance(v, dict) and "endpoint" in v or isinstance(v, dict) and any("endpoint" in str(subv) for subv in (v.values() if isinstance(v, dict) else [])))
    
    # Check data completeness
    print(f"\n{BLUE}Data Verification:{RESET}")
    
    projects_result = all_results.get("projects", {}).get("list_projects")
    if projects_result and projects_result["count"] >= 5:
        print_success(f"Projects: {projects_result['count']} records (expected: 5)")
    elif projects_result:
        print_error(f"Projects: {projects_result['count']} records (expected: 5)")
    
    crew_result = all_results.get("crew", {}).get("list_crew")
    if crew_result and crew_result["count"] >= 3:
        print_success(f"Crew: {crew_result['count']} records (expected: 3)")
    elif crew_result:
        print_error(f"Crew: {crew_result['count']} records (expected: 3)")
    
    quotes_result = all_results.get("quotes", {}).get("list_quotes")
    if quotes_result and quotes_result["count"] >= 2:
        print_success(f"Quotes: {quotes_result['count']} records (expected: 2)")
    elif quotes_result:
        print_error(f"Quotes: {quotes_result['count']} records (expected: 2)")
    
    invoices_result = all_results.get("invoices", {}).get("list_invoices")
    if invoices_result and invoices_result["count"] >= 1:
        print_success(f"Invoices: {invoices_result['count']} records (expected: 1)")
    elif invoices_result:
        print_error(f"Invoices: {invoices_result['count']} records (expected: 1)")
    
    users_result = all_results.get("users", {}).get("get_user")
    if users_result and users_result["status"] == 200:
        print_success(f"Users: User record retrieved")
    else:
        print_error(f"Users: Failed to retrieve user record")
    
    ecosystem_result = all_results.get("ecosystem", {}).get("agents")
    if ecosystem_result and ecosystem_result["status"] == 200:
        print_success(f"Ecosystem: {len(ecosystem_result['data'].get('agents', []))} agents found")
    
    return all_results

def save_results(results):
    """Save test results to JSON file."""
    if results is None:
        return
    
    # Convert results to JSON-serializable format
    json_results = {
        "timestamp": datetime.utcnow().isoformat(),
        "base_url": BASE_URL,
        "health_check": results.get("health_check"),
    }
    
    # Add endpoint results
    for section, data in results.items():
        if section == "health_check":
            continue
        if isinstance(data, dict):
            json_results[section] = {}
            for endpoint_name, endpoint_result in data.items():
                if endpoint_result:
                    json_results[section][endpoint_name] = {
                        "status": endpoint_result.get("status"),
                        "endpoint": endpoint_result.get("endpoint"),
                        "count": endpoint_result.get("count"),
                        "data": endpoint_result.get("data"),
                    }
    
    # Save to file
    output_path = "/Users/scottyhugs/Desktop/projects/master-os/backend/api_test_results.json"
    with open(output_path, "w") as f:
        json.dump(json_results, f, indent=2)
    
    print(f"\n{GREEN}Results saved to: {output_path}{RESET}")

if __name__ == "__main__":
    results = run_all_tests()
    save_results(results)
