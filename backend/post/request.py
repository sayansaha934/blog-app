from pydantic import BaseModel
from typing import Optional


class CreatePostRequest(BaseModel):
    title:str
    body:str


class EditPostRequest(BaseModel):
    title:str
    body:Optional[str]=""