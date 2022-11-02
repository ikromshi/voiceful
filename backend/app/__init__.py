from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_cors import CORS
CORS(app)

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import routes, models