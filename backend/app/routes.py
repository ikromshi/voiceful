from app import app, db
from flask import flash, jsonify, request
from datetime import datetime, timezone, timedelta
from app.models import *
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, \
    JWTManager
import json


@app.route('/')
@app.route('/index')
def index():
    populate_db()
    folders = {
        "posts": [
            {
                "id": 1,
                "title": "1st post",
                "datetime": "July 16, 2021 11:47:39 AM",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                "id": 2,
                "title": "Second post updated updated",
                "datetime": "July 16, 2021 11:47:48 AM",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. two"
            },
            {
                "id": 3,
                "title": "Number Three updated",
                "datetime": "July 16, 2021 11:48:01 AM",
                "body": "Third post... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                "id": 4,
                "title": "Testing a 4th post",
                "datetime": "August 02, 2021 11:46:27 AM",
                "body": "Some more testing paragraphs!"
            }
        ]
    }
    return folders


def clear_data():
    flash("Resetting database: deleting old data and repopulating with dummy data")
    # clear all data from all tables
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        print('Clear table {}'.format(table))
        db.session.execute(table.delete())
    db.session.commit()


def populate_db():
    clear_data()
    u1 = User(name="Arabella", password="1234", email="afielder@ithaca.edu", voice="Alex")
    u2 = User(name="Ikrom", password="2345", email="inumonov@ithaca.edu", voice="Alex")
    u3 = User(name="Lauren", password="3456", email="lmitchell@ithaca.edu", voice="Karen")
    u1.set_password("1234")
    u2.set_password("2345")
    u3.set_password("3456")
    db.session.add_all([u1, u2, u3])
    db.session.commit()

    f1 = Folder(name="Names", user_id=1)
    f2 = Folder(name="School", user_id=2)
    f3 = Folder(name="Places", user_id=3)
    f4 = Folder(name="Food", user_id=1)
    db.session.add_all([f1, f2, f3, f4])
    db.session.commit()

    b1 = Button(name="Arabella", folder_id=1)
    b2 = Button(name="Ikrom", folder_id=1)
    b3 = Button(name="Doug", folder_id=1)
    b4 = Button(name="Pen", folder_id=2)
    b5 = Button(name="Computer", folder_id=2)
    b6 = Button(name="Home", folder_id=3)
    b7 = Button(name="School", folder_id=3)
    b8 = Button(name="Ithaca", folder_id=3)
    b9 = Button(name="Chicken", folder_id=4)
    b10 = Button(name="Lasagna", folder_id=4)
    db.session.add_all([b1, b2, b3, b4, b5, b6, b7, b8, b9, b10])
    db.session.commit()
    return ""


@app.route('/autocomplete')
def autocomplete():
    buttons_folders = ['Names', 'School', 'Arabella', 'Ikrom', 'Apple', 'Numonov']
    q = request.args.get('q', "")
    matches = list()
    for a in buttons_folders:
        if a.lower().startswith(q.lower()):
            matches.append(a)

    return jsonify(result=matches)


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response


@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # if statement needs to check that user email goes with user password
    # look to log in validation
    user = User.query.filter_by(email=email).first()
    if email is None or not user.check_password(password):
        # if email != "test" or password != "test":
        return {"msg": "Invalid email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token": access_token, "email": user.email, "password": user.password, "name": user.name, "voice": user.voice}
    return response


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    name = request.json.get("name", None)
    password = request.json.get("password", None)
    email = request.json.get("email", None)
    voice = request.json.get("voice", None)
    if db.session.query(User).filter_by(email=email).first():
        return {"msg": "User already exists"}, 401
    user = User(name=name, email=email, password=password, voice=voice)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity=email)
    return {"msg": "User now registered", "access_token": access_token}, 200


@app.route("/profile", methods=["POST"])
@jwt_required()
def profile():
    name = request.json.get("name", None)
    password = request.json.get("password", None)
    email = request.json.get("email", None)
    voice = request.json.get("voice", None)

    # Are these properties read-only?
    user = User.query.filter_by(email=email).first()
    user.set_password(password)
    user.name = name
    user.password = password
    user.email = email
    user.voice = voice

    db.session.add(user)
    db.session.commit()

    return {"msg": "User data successfully updated"}, 200

@app.route('/folder', methods=['GET', 'POST'])
def folder():
    if request.method == 'POST':
        folder = request.json.get("folder", None)
        email = request.json.get("email", None)
        user = User.query.filter_by(email=email).first()
        nFolder = Folder(name=folder, user_id=user.id)
        db.session.add(nFolder)
        db.session.commit()
        return {"msg": "New folder created"}, 200 # not sure which response to use here
    elif request.method == 'GET':
        email = request.json.get("email", None)
        user = User.query.filter_by(email=email).first()
        folders = Folder.query.filter_by(user_id=user.id).all()
        return {"msg": "Successful folder query", "data": f"{folders}"}, 200
    else:
        return {"msg": "Method type not found"}, 401

@app.route('/button', methods=['GET', 'POST'])
def button():
    if request.method == 'POST':
        buttonCollected = request.json.get("button", None)
        folder = request.json.get("folder", None)
        folderFound = Folder.query.filter_by(name=folder).first()
        newButton = Button(name=buttonCollected, folder_id=folderFound.id)
        db.session.add(newButton)
        db.session.commit()
        return {"msg": "New button created"}, 200
    elif request.method == 'GET':
        folderName = request.json.get("folder", None)
        folder = Folder.query.filter_by(name=folderName).first()
        buttons = Button.query.filter_by(folder_id=folder.id).all()
        return {"msg": "Successful button query", "data": f"{buttons}"}, 200
    else:
        return {"msg": "Method type not found"}
