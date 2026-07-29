from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import projects, quotes, crew, photos, invoices, users

app = FastAPI(title="Master OS API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(projects.router)
app.include_router(quotes.router)
app.include_router(crew.router)
app.include_router(photos.router)
app.include_router(invoices.router)
app.include_router(users.router)

@app.get("/")
def read_root():
    return {"message": "Master OS API running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
