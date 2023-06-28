from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field
from pydantic import validator

class PersonImageCreate(BaseModel):
    image_url: str = Field(..., title="Image url" ,max_length=60, min_length=5)   #title='Title' no lo voy a poner como argumento
    genre: str = Field(..., title="Man | Woman")
    age: int = Field(..., gt=0)
    sick: bool

    @validator('genre')
    def validate_genre(cls, value):
        if value not in ['Man', 'Woman']:
            raise ValueError('Invalid genre. Only "Man" or "Woman" allowed.')
        return value

class PersonImageUpdate(BaseModel):
    image_url: Optional[str] = Field(..., title="Image url" , min_length=5)   #title='Title' no lo voy a poner como argumento
    genre: Optional[str] = Field(..., title="Man | Woman")
    age: Optional[int] = Field(..., gt=0)
    sick: Optional[bool] = False            #no sé si debería ser así
    
    @validator('genre')
    def validate_genre(cls, value):
        if value not in ['Man', 'Woman']:
            raise ValueError('Invalid genre. Only "Man" or "Woman" allowed.')
        return value
    
class PersonImageOut(BaseModel):
    personImage_id: UUID
    image_url: str 
    genre: str 
    age: int 
    sick: bool
    created_at: datetime
    updated_at: datetime