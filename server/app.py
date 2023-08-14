from flask import Flask, request, jsonify
from api import db
from flask_cors import CORS, cross_origin
import bcrypt

app = Flask(__name__)

@app.route('/api/rsvp', methods=['POST'])
@cross_origin()
def rsvp():
    invitees_collection = db['Invitees']
    rsvp_collection = db['rsvp']
    user_data = request.json
    # Check if the user is invited
    if invitees_collection.find_one({'email': user_data['email']}) is None:
        return jsonify({'message': 'Please use the email address you were invited with', 'status': 400})

    if rsvp_collection.find_one({'email': user_data['email']}) is not None:
        return jsonify({'message': 'This email address has already responded', 'status': 400})
    # Insert user data into the database
    user_id = rsvp_collection.insert_one({
        'name': user_data['name'],
        'email': user_data['email'],
        'attending': user_data['attending'],
        'guest': user_data['guest'],
    }).inserted_id

    return jsonify({'message': 'User registered successfully', 'user_id': str(user_id)})

@app.route('/api/guestList', methods=['GET'])
@cross_origin()
def guestList():
    admin_collection = db['admins']
    rsvp_collection = db['rsvp']
    password = request.args.get('password')
    user = admin_collection.find_one({'username': request.args.get('username')})
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        guests = []
        for guest in rsvp_collection.find():
            guests.append({
                'name': guest['name'],
                'email': guest['email'],
                'attending': guest['attending'],
                'guest': guest['guest'],
            })
        return jsonify(guests)
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

if __name__ == '__main__':
    app.run()