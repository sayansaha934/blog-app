from fastapi import FastAPI
from post.router import router as post_router
from fastapi.middleware.cors import CORSMiddleware

import uvicorn

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(post_router, prefix="/posts", tags=["Post"])


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8009, reload=True)
