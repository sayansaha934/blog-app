from fastapi import APIRouter
from fastapi.responses import JSONResponse
from .service import PostService
from .request import CreatePostRequest, EditPostRequest
from db import SESSION

router = APIRouter()


@router.post("")
def create_post(args: CreatePostRequest):
    try:
        new_post = PostService().create_post(
            SESSION=SESSION, title=args.title, body=args.body
        )
        SESSION.close()
        return JSONResponse(status_code=200, content=new_post)
    except Exception as e:
        print(e)
        SESSION.rollback()
        return JSONResponse(status_code=500, content=str(e))


@router.put("/{id}")
def edit_post(id: str, args: EditPostRequest):
    try:
        edited_post = PostService().edit_post(SESSION=SESSION, post_id=id, title=args.title, body=args.body)
        SESSION.close()
        return JSONResponse(status_code=200, content=edited_post)
    except Exception as e:
        print(e)
        SESSION.rollback()
        return JSONResponse(status_code=500, content=str(e))


@router.delete("/{id}")
def delete_post(id: str):
    try:
        PostService().delete_post(SESSION=SESSION, post_id=id)
        SESSION.close()
        return JSONResponse(
            status_code=200, content={"message": "Post deleted successfully"}
        )
    except Exception as e:
        print(e)
        SESSION.rollback()
        return JSONResponse(status_code=500, content=str(e))


@router.get("/{id}")
def get_post(id: str):
    try:
        post = PostService().get_post(SESSION=SESSION, post_id=id)
        SESSION.close()
        return JSONResponse(status_code=200, content=post)
    except Exception as e:
        print(e)
        SESSION.rollback()
        return JSONResponse(status_code=500, content=str(e))


@router.get("")
def get_all_posts():
    try:
        posts = PostService().get_all_posts(SESSION=SESSION)
        SESSION.close()
        return JSONResponse(status_code=200, content=posts)
    except Exception as e:
        print(e)
        SESSION.rollback()
        return JSONResponse(status_code=500, content=str(e))
