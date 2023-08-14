import axios from 'axios';

export const rsvp = async (email:string, name:string, attending:boolean, guest?:string) => {
    const rsvpData = {
        email: email,
        name: name,
        attending: attending,
        guest: guest
    }
    try {
        const response = await axios.post('http://localhost:5000/api/rsvp', rsvpData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error while sending RSVP:', error);
        throw error;
    }
}