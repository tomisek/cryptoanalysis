from flask import Flask, request, json, jsonify
from __main__ import app
from user.user import User

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


@app.route('/user/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.json
        # data = request.get_json()
        # datadump = json.dumps(data)
        # res = json.loads(datadump)
        email = data['email']
        name = data['name']
        password = data['password']

        return User().register(name, email, password)
    # return User().register()
    else:
        return User().register()

@app.route('/user/logout')
def logout():
    return User().logout()

@app.route('/user/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    return User().login(email, password)

@app.route('/user/forecasts', methods=["GET", "POST"])
def saveForecast():
    if request.method =="GET":
        user_id = request.json['id']
        return User().showForecasts(user_id) 

    if request.method =="POST":
        data = request.json

        return User().saveForecast(data)

@app.route('/rest/get-user')
@jwt_required()
def getUser():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user)