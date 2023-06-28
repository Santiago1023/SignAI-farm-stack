from fastapi import FastAPI
from app.core.config import settings
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from app.models.user_model import User
from app.models.personImage_model import PersonImage
from app.api.api_v1.router import router 

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)
@app.get('/')
def hello():
    return {"message": "Hello, world"}

@app.on_event("startup")
async def app_init():
    """
        initialize crucial application services
    """
    # fodoist es el nombre de la BD
    #db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING).fodoist
    db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING).signaidb
    
    await init_beanie(
        database=db_client,
        document_models= [
            User,
            PersonImage
        ]
    )

app.include_router(router, prefix=settings.API_V1_STR)