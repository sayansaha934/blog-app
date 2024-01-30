import uuid
from .model import Post
from .schema import PostSchema

class PostService:
    def __init__(self) -> None:
        pass

    def create_post(self, SESSION, title, body):
        new_post = Post(title=title, body=body)
        SESSION.add(new_post)
        SESSION.commit()
        data = PostSchema(only=["id"]).dump(new_post)
        return data

    def get_post(self, SESSION, post_id: uuid.UUID):
        post= SESSION.query(Post).filter(Post.id == post_id).first()
        data=PostSchema(only=["id", "title", "body"]).dump(post)
        return data

    def delete_post(self, SESSION, post_id: uuid.UUID):
        post_to_delete = (
            SESSION.query(Post)
            .filter(Post.id == post_id)
            .first()
        )
        if post_to_delete:
            post_to_delete.status = "archived"
            SESSION.commit()
            return True


    def get_all_posts(self, SESSION):
        posts = SESSION.query(Post).filter(Post.status == "published").all()
        data=PostSchema(many=True, only=["id", "title", "body"]).dump(posts)
        return data


    def edit_post(self, SESSION, post_id: uuid.UUID, title:str, body:str):
        post_to_edit = SESSION.query(Post).filter(Post.id == post_id).first()
        if post_to_edit:
            post_to_edit.title = title
            post_to_edit.body = body
            SESSION.commit()
            data=PostSchema().dump(post_to_edit)
            return data
