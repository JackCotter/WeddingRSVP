import qrcode
from bs4 import BeautifulSoup
from PIL import Image


def main():
    img = qrcode.make(
        'https://wedding-rsvp-5506heh7o-jackcotter.vercel.app/auth/')
    type(img)  # qrcode.image.pil.PilImage
    # img.save("some_file.png")
    background = Image.open("base.png")
    img.thumbnail((180, 180))
    img = img.convert("RGBA")

    background.paste(img, (300, 560), img)
    background.show()


if __name__ == "__main__":
    main()
