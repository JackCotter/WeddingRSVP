from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import bcrypt
import os
from dotenv import load_dotenv

load_dotenv()
client = MongoClient(
    f"mongodb+srv://{os.getenv('MONGO_USERNAME')}:{os.getenv('MONGO_PASSWORD')}@{os.getenv('MONGO_CLUSTER')}.6ba2vaf.mongodb.net/?retryWrites=true&w=majority")
db = client['wedding']
app = Flask(__name__)


@app.route('/api/rsvp', methods=['POST'])
@cross_origin()
def rsvp():
    auth_string_collection = db['authStrings']
    rsvp_collection = db['rsvp']
    song_request_collection = db['SongRequests']
    dietary_restrictions_collection = db['DietaryRestrictions']
    user_data = request.json
    auth_string = user_data.get('authString')
    if auth_string is None:
        return jsonify({'message': 'No Authentication Token Supplied. Please scan QR code on invitation', 'status': 400})
    auth_id = auth_string[0:3]
    auth_string = auth_string[3:]
    auth_string_in_db = auth_string_collection.find_one({'id': auth_id})

    if auth_string_in_db is None or rsvp_collection.find_one({'id': auth_id}) is not None or bcrypt.checkpw(auth_string.encode('utf-8'), auth_string_in_db['auth_string'].encode('utf-8')) is False:
        return jsonify({'message': 'Invalid token. Please scan QR code to RSVP.', 'status': 400})

    if (user_data['song'] and user_data['song'] != ''):
        song_request_collection.insert_one({
            'email': user_data['email'],
            'name': user_data['name'],
            'song': user_data['song']
        })

    if (user_data['diet'] and user_data['diet'] != ''):
        dietary_restrictions_collection.insert_one({
            'email': user_data['email'],
            'name': user_data['name'],
            'dietaryRestrictions': user_data['diet']
        })

    user_id = rsvp_collection.insert_one({
        'name': user_data['name'],
        'email': user_data['email'],
        'attending': user_data['attending'],
        'guest': user_data['guest'],
        'id': auth_id
    }).inserted_id

    return jsonify({'message': 'User registered successfully', 'user_id': str(user_id), 'status': 200})


@app.route('/api/auth/create', methods=['POST'])
@cross_origin()
def auth_create():
    auth_collection = db['authStrings']
    auth_data = request.json
    auth_string = auth_data.get('token')
    auth_id = auth_data.get('token_id')

    if auth_string is None:
        return jsonify({'message': 'No Token Provided', 'status': 400}), 400
    if auth_id is None:
        return jsonify({'message': 'No Id Provided', 'status': 400}), 400

    hashed_auth_string = bcrypt.hashpw(
        auth_string.encode('utf-8'), bcrypt.gensalt())

    auth_data = {
        'id': auth_id,
        'auth_string': hashed_auth_string.decode('utf-8')
    }

    current_auth = auth_collection.find_one({'id': auth_id})
    
    if current_auth is None:
        auth_collection.insert_one(auth_data)
    else:
        auth_collection.update_one({'id': auth_id}, {'$set': auth_data})

    return {'success': True}


@app.route('/api/guestList', methods=['GET'])
@cross_origin()
def guestList():
    admin_collection = db['admins']
    rsvp_collection = db['rsvp']
    song_request_collection = db['SongRequests']
    dietary_restrictions_collection = db['DietaryRestrictions']
    password = request.args.get('password')
    user = admin_collection.find_one(
        {'username': request.args.get('username')})
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        guests = []
        for guest in rsvp_collection.find():
            song_request = song_request_collection.find_one(
                {'email': guest['email']})
            dietary_restrictions = dietary_restrictions_collection.find_one(
                {'email': guest['email']})
            if ('name' not in guest or 'email' not in guest or 'attending' not in guest or 'guest' not in guest):
                continue
            guests.append({
                'name': guest['name'],
                'email': guest['email'],
                'attending': guest['attending'],
                'guest': guest['guest'],
                'song': song_request['song'] if song_request else '',
                'dietaryRestrictions': dietary_restrictions['dietaryRestrictions'] if dietary_restrictions else ''
            })
        return jsonify({'guests': guests, 'status': 200})
    else:
        return jsonify({'message': 'Invalid username and password', 'status': 400})

# @app.route('/api/signup', methods=['POST'])
# @cross_origin()
# def signup():
#     users_collection = db['admins']
#     password = ''
#     hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

#     user_data = {
#         'username': '',
#         'password': hashed_password.decode('utf-8')
#         # Other user data
#     }

#     users_collection.insert_one(user_data)
#     return {'success': True}


if __name__ == '__main__':
    app.run()
