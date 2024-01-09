# WeddingRSVP
A simple application that will collect Wedding RSVPs for an upcoming wedding! 

## Workflow - Invitee
- Generate invites using the included invite generator. The generator can be used to create any number of invites as well as a corresponding hashed auth token in the database.
- Guests scan invite's QR code and are directed to holtwedding.ca/auth/<authtoken>
- Guests click rsvp link on webpage and input name, email, guest name, song requests, and dietary restrictions
- Guests submit rsvp form, auth token is included in form
- api validates auth token against hashed token in db
- If valid, guest is notified that they have rsvped successfully and their information is stored in the DB. If not, client is notified to scan QR code.
## Workflow - Wedding Party
- Wedding party are given a Username and Password manually by admin (me). There is no way for a regular user to create a new user in the production version. Passwords are hashed in db.
- Individuals with a valid admin Username and Password can manually navigate to /guest-list and view the full guest list including Dietary Restrictions and Songs.

Check it out at holtwedding.ca
