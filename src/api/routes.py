"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, abort
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import re
from api.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route("/signup", methods=['POST'])
def sign_up():
    body = request.json

    # Validación de campos
    if not body.get("email") or not body.get("name") or not body.get("password"):
        return jsonify({"error": "Missing fields"}), 400

    # Verificar si el formato del email es válido
    if not re.match(r"[^@]+@[^@]+\.[^@]+", body["email"]):
        return jsonify({"error": "Invalid email format"}), 400

    # Verificar si el usuario ya existe
    existing_user = User.query.filter_by(email=body["email"]).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    # Hashear la contraseña
    hashed_password = generate_password_hash(body["password"])

    # Crear nuevo usuario
    new_user = User(email=body["email"], name=body["name"], password=hashed_password)
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize()), 201  # Usando serialize para la respuesta
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "User could not be created. Please try again later."}), 500

@api.route("/login", methods=['POST'])
def login():
    body = request.json

    # Validación de campos
    if not body.get("email") or not body.get("password"):
        return jsonify({"error": "Missing fields"}), 400

    # Verificar si el formato del email es válido
    if not re.match(r"[^@]+@[^@]+\.[^@]+", body["email"]):
        return jsonify({"error": "Invalid email format"}), 400

    # Verificar si el usuario ya existe
    user = User.query.filter_by(email=body["email"]).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Hashear la contraseña
    valid_password = check_password_hash(user.password, body["password"])

    if not valid_password:
        return jsonify({"error": "Bad email or password"}), 400
    
    response_body = {
        "access_token": create_access_token(identity=body["email"]),
        "user": user.serialize()
    }
    return jsonify(response_body),200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.serialize()), 200
