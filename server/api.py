from pymongo import MongoClient
import json

config = {}
with open('config.json') as f:
    config = json.load(f)

client = MongoClient(f"mongodb+srv://{config['username']}:{config['password']}@{config['cluster']}.6ba2vaf.mongodb.net/?retryWrites=true&w=majority")
db = client['wedding']