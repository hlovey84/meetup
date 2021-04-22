import axios from 'axios'

const BASE_API_URL = 'http://localhost:3001/'
const NEW_MEETUP = 'meetup'
const LOGIN = 'login/'


class MeetupDataService {

    login(credentials) {
        console.log('executing service login');
        return axios.post(`${BASE_API_URL}${LOGIN}`, credentials, 
        {
            headers: { 'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
            'Content-Type' : 'application/json'}
        });
    }

    
    subscribe(meetupId) {
        let userId = sessionStorage.getItem('userId');
        console.log('executing service subscribe with: ' + meetupId + '' + userId);
        return axios.post(`${BASE_API_URL}subscriptions/meetups/${meetupId}/users/${userId}`,
        {
            headers: { 
                'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
                'Content-Type' : 'application/json'
            }
        });
    }

    
    retrieveMeetups() {
        console.log('executing service retrieveMeetups');
        return axios.get(`${BASE_API_URL}meetups`);
    }

    
    createMeetup(meetup) {
        console.log('executing service createMeetup with: ' + meetup);
        return axios.post(`${BASE_API_URL}${NEW_MEETUP}`, meetup,
        {
            headers: { 
                'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
                'Content-Type' : 'application/json'
            }
        });
    }


}

export default new MeetupDataService()