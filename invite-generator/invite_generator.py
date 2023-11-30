import qrcode
from bs4 import BeautifulSoup
from PIL import Image
import sys
import string
import secrets
import requests
import os

client_url = 'http://localhost:3000/'
server_url = 'http://localhost:5000/api/'

def generate_token():
    alphabet = "abcdefghijklmnopqrstuvwxyz0123456789"
    return ''.join(secrets.choice(alphabet) for _ in range(30))

def save_tokens(token_list):
    for token in token_list:
        token_id = token[0]
        token = token[1]
        x = requests.post(server_url + 'auth/create', json={'token': token, 'token_id': token_id})
        print(x.text)

def generate_invites(input_filepath, number_invites):
    token_list = []
    for invite_number in range(number_invites):
        token_id = str(invite_number).zfill(3)
        token_auth_string = generate_token()
        token = token_id + token_auth_string
        token_list.append((token_id, token_auth_string))

        qr_url = client_url + 'auth/' + token
        img = qrcode.make(qr_url)

        background = Image.open(input_filepath)
        img.thumbnail((180, 180))
        img = img.convert("RGBA")

        background.paste(img, (300, 560), img)
        
        output_filename = "./completed_invites/invite" + token_id + ".png"
        # Delete file if it exists
        try:
            os.remove(output_filename)
        except OSError:
            pass

        background.save(output_filename, "PNG")
    print(token_list)
    save_tokens(token_list)



def main(input_filepath, number_invites):
    generate_invites(input_filepath, int(number_invites))


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 invite_generator.py <inputfilepath.png> <number_invites>")
        exit(1)
    input_filepath = sys.argv[1]
    number_invites = sys.argv[2]
    main(input_filepath, number_invites)
