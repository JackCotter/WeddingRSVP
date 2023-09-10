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
    return response.data;
}

export const songRequest = async (email: string, name:string, songRequest:string) => {
    const data = {
        email: email,
        name: name,
        song: songRequest
    }
    const response = await axios.post('http://localhost:5000/api/songRequest', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
}

export const dietaryRestrictions = async (email: string, name:string, dietaryRestrictions:string) => {
    const data = {
        email: email,
        name: name,
        diet: dietaryRestrictions
    }
    const response = await axios.post('http://localhost:5000/api/dietaryRestrictions', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
}

export const getGuestList = async (username: string, password: string) => {
    const response = await axios.get('http://localhost:5000/api/guestList?username=' + username + '&password=' + password);
    return response;
}