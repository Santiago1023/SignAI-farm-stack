from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends
from app.models.user_model import User
from app.api.deps.user_deps import get_current_user
from app.schemas.personImage_schema import PersonImageOut, PersonImageUpdate, PersonImageCreate
from app.services.personImage_service import PersonImageService
from app.models.personImage_model import PersonImage

personImage_router = APIRouter()

@personImage_router.get('/', summary="Get all PersonImages of the user", response_model=List[PersonImageOut])
async def list(current_user: User = Depends(get_current_user)):
    return await PersonImageService.list_personImages(current_user)

@personImage_router.post('/create', summary="Create PersonImage", response_model=PersonImage)
async def create_personImage(data: PersonImageCreate, current_user: User = Depends(get_current_user)):
    return await PersonImageService.create_personImage(current_user, data)

@personImage_router.get('/{personImage_id}', summary="Get a personImage by personImage_id", response_model=PersonImageOut)
async def retrieve(personImage_id: UUID, current_user: User = Depends(get_current_user)):
    return await PersonImageService.retrieve_personImage(current_user, personImage_id)


@personImage_router.put('/{personImage_id}', summary="Update personImage by personImage_id", response_model=PersonImageOut)
async def update(personImage_id: UUID, data: PersonImageUpdate, current_user: User = Depends(get_current_user)):
    return await PersonImageService.update_personImage(current_user, personImage_id, data)


@personImage_router.delete('/{personImage_id}', summary="Delete personImage by personImage_id")
async def delete(personImage_id: UUID, current_user: User = Depends(get_current_user)):
    await PersonImageService.delete_personImage(current_user, personImage_id)
    return None