from flask import Flask, request, jsonify
from pymongo import MongoClient
import json
import bcrypt

config = {}
with open('config.json') as f:
    config = json.load(f)
print(config)

app = Flask(__name__)
client = MongoClient(f"mongodb+srv://{config['username']}:{config['password']}@{config['cluster']}.6ba2vaf.mongodb.net/?retryWrites=true&w=majority")
db = client['wedding']

@app.route('/api/signup', methods=['POST'])
def signup():
    invitees_collection = db['Invitees']
    rsvp_collection = db['rsvp']
    user_data = request.json
    # print(user_data)
    print(invitees_collection.find_one({'email': user_data['email']}))
    # Check if the user already exists
    if invitees_collection.find_one({'email': user_data['email']}) is None:
        return jsonify({'message': 'Please use the email address you were invited with', 'status': 400})

    # Hash the password

    # Insert user data into the database
    user_id = rsvp_collection.insert_one({
        'email': user_data['email'],
        'attending': user_data['attending'],
        'guests': user_data['guests'],
    }).inserted_id

    return jsonify({'message': 'User registered successfully', 'user_id': str(user_id)})

if __name__ == '__main__':
    app.run()