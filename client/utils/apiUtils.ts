import axios from 'axios';

export const rsvp = async (email:string, name:string, attending:boolean, guest:string, song:string, diet: string) => {
    const rsvpData = {
        email: email,
        name: name,
        attending: attending,
        guest: guest,
        song: song,
        diet: diet
    }
    const response = await axios.post('https://weddingrsvp-api.vercel.app/api/rsvp', rsvpData, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
}

export const getGuestList = async (username: string, password: string) => {
    const response = await axios.get('https://weddingrsvp-api.vercel.app/api/guestList?username=' + username + '&password=' + password);
    return response;
}