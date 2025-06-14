from os import curdir
from flask import Flask, jsonify, render_template, request
import sqlite3

app = Flask(__name__)

DATABASE = "database.db"


def get_db():
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db


def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource("./db/perfil.sql", mode="r") as f:
            db.cursor().executescript(f.read())
        db.commit()


@app.route("/initdb")
def initialize_database():
    init_db()
    return "Database inicializado"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/perfil", methods=["POST", "GET"])
def manage_profile():
    if request.method == "POST":
        cpf = request.json.get("cpf")
        nome = request.json.get("nome")
        email = request.json.get("email")
        senha = request.json.get("senha")

        if not cpf or not email:
            return jsonify({"error": "cpf e email são obrigatórios!"}), 400

        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute(
                "INSERT INTO perfil (cpf, nome, email, senha, tipo_perfil) VALUES (?, ?, ?, ?, ?)",
                (cpf, nome, email, senha, 1),
            )
            db.commit()
            return jsonify({"message": "Dado gravado com sucesso!"}), 201
        except sqlite3.Error as e:
            return jsonify({"error": str(e)}), 500
        finally:
            db.close()

    elif request.method == "GET":
        return home()


@app.route("/perfis", methods=["GET"])
def get_profiles():
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM perfil")
        profiles = cursor.fetchall()
        return jsonify([dict(profile) for profile in profiles])
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()


@app.route("/perfil/<profile_id>", methods=["GET"])
def get_profile(profile_id):
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM perfil WHERE tipo_perfil = ?", (profile_id))
        profile = cursor.fetchone()
        if profile:
            return jsonify(dict(profile))
        else:
            return jsonify({"error": "Not found"}), 404
    finally:
        db.close()


@app.route("/perfil/<profile_id>", methods=["PUT"])
def update_profile(profile_id):
    name = request.json.get("nome")
    email = request.json.get("email")

    if not name or not email:
        return jsonify({"error": "Nome e email são obrigatórios"}), 400

    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            "UPDATE perfil SET nome = ?, email = ? WHERE tipo_perfil = ?",
            (name, email, profile_id),
        )
        db.commit()
        return jsonify({"message": "Perfil atualizado com sucesso"})
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()


@app.route("/perfil/<profile_id>", methods=["DELETE"])
def delete_profile(profile_id):
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM perfil WHERE tipo_perfil = ?", (profile_id))
        db.commit()
        return jsonify({"message": "Perfil deletado com sucesso"})
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()


if __name__ == "__main__":
    app.run(debug=True)
