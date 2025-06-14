from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("DB_URL")
db = SQLAlchemy(app)

"""
CREATE TABLE perfil (
  cpf VARCHAR(11),
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(128) NOT NULL,
  ativo BOOLEAN,
  tipo_perfil INT,
  id_form INT,
  CONSTRAINT perfil_pk PRIMARY KEY(cpf),
  CONSTRAINT form_fk FOREIGN KEY (id_form)
    REFERENCES form(id_form)
);
"""


class Profile(db.Model):
    __tablename__ = "profile"

    cpf = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def json(self):
        return {"id": self.cpf, "name": self.name, "email": self.email}


db.create_all()


# create a test route
@app.route("/test", methods=["GET"])
def test():
    return make_response(jsonify({"message": "test route"}), 200)


# create a profile
@app.route("/profiles", methods=["POST"])
def create_profile():
    try:
        data = request.get_json()
        new_profile = Profile(name=data["name"], email=data["email"])
        db.session.add(new_profile)
        db.session.commit()
        return make_response(jsonify({"message": "profile created"}), 201)
    except e:
        return make_response(jsonify({"message": "error creating profile"}), 500)


# get all profiles
@app.route("/profiles", methods=["GET"])
def get_profiles():
    try:
        profiles = Profile.query.all()
        return make_response(jsonify([profile.json() for profile in profiles]), 200)
    except e:
        return make_response(jsonify({"message": "error getting profiles"}), 500)


# get a profile by id
@app.route("/profile/<int:id>", methods=["GET"])
def get_profile(id):
    try:
        profile = Profile.query.filter_by(id=id).first()
        if profile:
            return make_response(jsonify({"profile": profile.json()}), 200)
        return make_response(jsonify({"message": "profile not found"}), 404)
    except e:
        return make_response(jsonify({"message": "error getting profile"}), 500)


# update a profile
@app.route("/profiles/<int:id>", methods=["PUT"])
def update_profile(id):
    try:
        profile = Profile.query.filter_by(id=id).first()
        if profile:
            data = request.get_json()
            profile.name = data["name"]
            profile.email = data["email"]
            db.session.commit()
            return make_response(jsonify({"message": "profile updated"}), 200)
        return make_response(jsonify({"message": "profile not found"}), 404)
    except e:
        return make_response(jsonify({"message": "error updating profile"}), 500)


# delete a profile
@app.route("/profiles/<int:id>", methods=["DELETE"])
def delete_profile(id):
    try:
        profile = Profile.query.filter_by(id=id).first()
        if profile:
            db.session.delete(profile)
            db.session.commit()
            return make_response(jsonify({"message": "profile deleted"}), 200)
        return make_response(jsonify({"message": "profile not found"}), 404)
    except e:
        return make_response(jsonify({"message": "error deleting profile"}), 500)
