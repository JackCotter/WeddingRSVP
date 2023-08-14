from flask import Flask, request, jsonify
from api import db
from flask_cors import CORS, cross_origin

app = Flask(__name__)
@app.route('/api/rsvp', methods=['POST'])
@cross_origin()
def signup():
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
        'email': user_data['email'],
        'attending': user_data['attending'],
        'guest': user_data['guest'],
    }).inserted_id

    return jsonify({'message': 'User registered successfully', 'user_id': str(user_id)})

if __name__ == '__main__':
    app.run()