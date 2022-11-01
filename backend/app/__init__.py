from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

##################################
# Cross-origin resource sharing (CORS) is a browser security feature that restricts
# cross-origin HTTP requests that are initiated from scripts running in the browser. 

from app import routes