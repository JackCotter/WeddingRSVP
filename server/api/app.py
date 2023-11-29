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
    invitees_collection = db['Invitees']
    rsvp_collection = db['rsvp']
    song_request_collection = db['SongRequests']
    dietary_restrictions_collection = db['DietaryRestrictions']
    user_data = request.json
    # Check if the user is invited
    if user_data.get('authString') is None or invitees_collection.find_one({'auth': user_data['authString'], 'used': {'$exists': True}}) is None:
        return jsonify({'message': 'Invalid token. Please scan QR code to RSVP.', 'status': 400})
    if rsvp_collection.find_one({'email': user_data['email']}) is not None:
        return jsonify({'message': 'This email address has already responded', 'status': 400})
    if song_request_collection.find_one({'email': user_data['email']}) is not None:
        return jsonify({'message': 'This guest has already provided a song request', 'status': 400})
    if dietary_restrictions_collection.find_one({'email': user_data['email']}) is not None:
        return jsonify({'message': 'This guest has already specified dietary restrictions', 'status': 400})

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
    }).inserted_id

    invitees_collection.update_one(
        {'auth': user_data['authString']},
        {'$set': {'used': True}}
    )
    return jsonify({'message': 'User registered successfully', 'user_id': str(user_id), 'status': 200})


@app.route('/api/guestList', methods=['GET'])
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
