from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from .model import Post


class PostSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        load_instance = True