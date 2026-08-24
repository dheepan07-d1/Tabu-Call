from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Tabu-Call Backend is running!"}