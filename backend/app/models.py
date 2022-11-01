from werkzeug.security import generate_password_hash

from app import db
from flask_login import UserMixin

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(120))
    email = db.Column(db.String(120), index=True, unique=True)
    voice = db.Column(db.String(64), index=True)

    def __repr__(self):
        return '<User {}>'.format(self.username)


class Folder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Folder {}>'.format(self.name)


class Button(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), index=True)
    folder_id = db.Column(db.Integer, db.ForeignKey('folder.id'))

    def __repr__(self):
        return '<Button {}>'.format(self.name)