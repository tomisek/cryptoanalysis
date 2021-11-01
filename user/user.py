from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from main import db
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import uuid

class User:
    
    def session(self, user):
        del user['password'] # remove password from session
        session['logged_in'] = True
        session['user'] = user
        return jsonify(user), 200

    def register(self, name, email, password):

        user = {
            #create a random id, "_id" for mongodb key
            "_id": uuid.uuid4().hex, 
            "name": name,
            "email": email,
            "password": password
        }
        
        # encrypt password
        user['password'] = pbkdf2_sha256.encrypt(user['password'])

        # check for email in db
        if db.users.find_one({ "email": user['email'] }):
            return jsonify({ "error": "E-mail already in use"}), 400
        
        # if sucessful, insert user object to collection 'users'
        if db.users.insert_one(user):
            return self.session(user)

        return jsonify({"error": "Registration failed"}), 400
    
    def logout(self):
        session.clear()
        print('logged out')
        return redirect('/')

    def login(self, email, password):
        user = db.users.find_one({
            "email": email
        })

        # if user is found and the password is a verified match, start session
        if user and pbkdf2_sha256.verify(password, user['password']): 
            print('logged in')
            access_token = create_access_token(identity=user['email'])
            self.session(user)
            return jsonify(access_token = access_token)

        return jsonify({"error": "Invalid email"}), 401 # 401 unauthorized

    def saveForecast(self, data):
        if db.forecasts.insert_one(data):
            return "saved forecast", 200
        return jsonify({"error": "Could not save to database"})

    def showForecasts(self, user_id):
        userForecasts = ""
        for doc in db.users.aggregate([ 
            {
                # find user with the user_id
                '$match': {
                    '_id': user_id
                }
            }, {
                # join forecasts collection on user id
                '$lookup': {
                    'from': 'forecasts', 
                    'localField': '_id', 
                    'foreignField': 'user', 
                    'as': 'forecasts'
                }
            }]):
            userForecasts = doc['forecasts']
            
        return jsonify(userForecasts)
