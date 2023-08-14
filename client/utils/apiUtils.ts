import axios from 'axios';

export const rsvp = async (email:string, name:string, attending:boolean, guest?:string) => {
    const rsvpData = {
        email: email,
        name: name,
        attending: attending,
        guest: guest
    }
    const response = await axios.post('http://localhost:5000/api/rsvp', rsvpData, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    console.log(response.data);
    return response.data;
}

export const getGuestList = async (username: string, password: string) => {
    const response = await axios.get('http://localhost:5000/api/guestList?username=' + username + '&password=' + password);
    return response;
}