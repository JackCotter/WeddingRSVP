import qrcode
from bs4 import BeautifulSoup
from PIL import Image
import sys
import string
import secrets


def generate_token():
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(30))


def generate_invites(number_invites):
    for invite_number in range(number_invites):
        token = str(invite_number).zfill(3) + generate_token()
        qr_url = 'https://wedding-rsvp-5506heh7o-jackcotter.vercel.app/auth/' + token
        img = qrcode.make(qr_url)

        background = Image.open("base.png")
        img.thumbnail((180, 180))
        img = img.convert("RGBA")

        background.paste(img, (300, 560), img)
        background.save("./completed_invites/invite" +
                        str(invite_number).zfill(3) + ".png", "PNG")


def main(number_invites):
    generate_invites(int(number_invites))


if __name__ == "__main__":
    number_invites = sys.argv[1]
    main(number_invites)
