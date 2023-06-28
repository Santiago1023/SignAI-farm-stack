from datetime import datetime
from uuid import UUID, uuid4
from beanie import Document, Indexed, Link, Replace, Insert, before_event
from pydantic import Field
from .user_model import User

class PersonImage(Document):
    personImage_id: UUID = Field(default_factory=uuid4, unique=True)

    image_url: Indexed(str)
    genre: str 
    age: int = 1
    sick: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    owner: Link[User]   # esto es una conexion de todo con user

    def __repr__(self) -> str:
        return f"<PersonImage personImage_id={self.personImage_id}>"

    def __str__(self) -> str:
        return f"PersonImage: {self.personImage_id}"

    def __hash__(self) -> int:
        return hash(self.personImage_id)

    @before_event([Replace, Insert])
    def update_update_at(self):
        self.updated_at = datetime.utcnow()
    
    class Settings():
        collection_name = "personImages"