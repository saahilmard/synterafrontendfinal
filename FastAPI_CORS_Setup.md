
# Setting up CORS in FastAPI Backend

To enable CORS in your FastAPI backend and accept requests from http://localhost:3000, add the following code to your main.py file:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Your routes and API endpoints...
```

Make sure to add this CORS middleware configuration near the top of your FastAPI application, before defining any routes.
