from app import app, db
from flask import flash
from app.models import *

@app.route('/')
@app.route('/index')
def index():
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
@app.route('/reset_db')


def reset_db():
    clear_data()
    #users
    u1 = User(name="Arabella", password_hash="1234", email="afielder@ithaca.edu", voice="man")
    u2 = User(name="Ikrom", password_hash="2345", email="inumonov@ithaca.edu", voice="man")
    u3 = User(name="Lauren", password_hash="3456", email="lmitchell@ithaca.edu", voice="woman")
    db.session.add_all([u1, u2, u3])
    db.session.commit()

    #folders
    f1 = Folder(name="Names", user_id=1)
    f2 = Folder(name="School", user_id=2)
    f3 = Folder(name="Places", user_id=3)
    f4 = Folder(name="Food", user_id=1)
    db.session.add_all([f1, f2, f3, f4])
    db.session.commit()

    #buttons
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




