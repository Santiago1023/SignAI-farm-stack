from typing import List
from uuid import UUID
from app.models.user_model import User
from app.models.personImage_model import PersonImage
from app.schemas.personImage_schema import PersonImageCreate, PersonImageUpdate


class PersonImageService:
    @staticmethod
    async def list_personImages(user: User) -> List[PersonImage]:
        personImages = await PersonImage.find(PersonImage.owner.id == user.id).to_list()
        return personImages
    
    @staticmethod
    async def create_personImage(user: User, data: PersonImageCreate) -> PersonImage:
        personImage = PersonImage(**data.dict(), owner=user)
        return await personImage.insert()
    
    @staticmethod
    async def retrieve_personImage(current_user: User, personImage_id: UUID):
        personImage = await PersonImage.find_one(PersonImage.personImage_id == personImage_id, PersonImage.owner.id == current_user.id)
        return personImage
    
    @staticmethod
    async def update_personImage(current_user: User, personImage_id: UUID, data: PersonImageUpdate):
        personImage = await PersonImageService.retrieve_personImage(current_user, personImage_id)
        await personImage.update({"$set": data.dict(exclude_unset=True)})
        
        await personImage.save()
        return personImage
    
    @staticmethod
    async def delete_personImage(current_user: User, personImage_id: UUID) -> None:
        personImage = await PersonImageService.retrieve_personImage(current_user, personImage_id)
        if personImage:
            await personImage.delete()
            
        return None