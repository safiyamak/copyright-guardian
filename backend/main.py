from fastapi import FastAPI, HTTPException
from ic.client import Client
from ic.identity import Identity
from ic.candid import encode, decode
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Add this import
from PIL import Image
import tensorflow as tf
import os
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import json
import base64
from perplexity_api import query_perplexity_sonar, image_to_base64, preprocess_image
from ai_art_similarity import search_with_query_image
import io
app = FastAPI()
load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# # ICP Local Client (Assumes Local Replica is Running)
# client = Client(url="http://localhost:8000/")
# identity = Identity()

# # Replace with your actual canister ID
# CANISTER_ID = "your-canister-id"

# @app.post("/api/login")
# async def login():
#     """Logs in an artist by generating an identity"""
#     global identity
#     identity = Identity()  # Generates a new identity (wallet)
#     return {"message": "Logged in", "principal": identity.sender()}

# @app.post("/api/create-post")
# async def create_post(artist: str, content: str):
#     """Creates a social media post on the blockchain"""
#     try:
#         argument = encode([artist, content])
#         response = client.call(CANISTER_ID, "create_post", argument, identity)
#         return {"message": "Post created", "post_id": decode(response)}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/sell-art")
# async def sell_art(artist: str, artwork_url: str, price: float):
#     """Creates an NFT listing on ICP for selling art"""
#     try:
#         argument = encode([artist, artwork_url, price])
#         response = client.call(CANISTER_ID, "sell_art", argument, identity)
#         return {"message": "Artwork listed for sale", "listing_id": decode(response)}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))



@app.post("/reverse-image-search")
async def reverse_image_search(
    file: UploadFile = File(...),
):
    try:
        # Read the image file
        image_data = await file.read()
        
        # Optional: Get the image embedding if needed for additional processing
        # img_array = preprocess_image(image_data)
        # embedding = image_model.predict(img_array)
        
        # Query Perplexity Sonar API
        result = search_with_query_image()
    except Exception as e:
        print(e)
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )
    return result
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)