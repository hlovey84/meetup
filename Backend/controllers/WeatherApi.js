const User = require('../model/user');
const Meetup = require('../model/meetup');
const Meetup_user = require('../model/user_meetup');
const Roles = require('../model/roles');
const json = require('body-parser/lib/types/json');
const user_meetup = require('../model/user_meetup');
const sequelize = require('sequelize');
const unirest = require("unirest");

async function getTemperatureDayOfMeetup(ubicacion, long, lat){
    var unirest = require('unirest');
    
    return unirest.get("https://community-open-weather-map.p.rapidapi.com/find")
        .header({"x-rapidapi-key": "477c3e02a1msh4ce612a78473b6fp12326bjsn5fa91cfb93e4",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "useQueryString": "true"})
        .query({
                    "q": ubicacion,
                    "cnt": "1",
                    "mode": "null",
                    "lon": long,
                    "type": "link, accurate",
                    "lat": lat,
                    "units": "metric"
                });
}

function getBeerBox(meetup, temperaturaByDay){
    // let temperaturaByDay = this.getTemperatureDayOfMeetup("Buenos Aires, CABA, Argentina","-58.3815591","-34.6036844");

    let numberOfBeerBox = 0;
    const numberOfBeerForBox = 6;
    const suscribers =  meetup.dataValues["totalVacancy"]-meetup.dataValues["availableVacancy"];
    if(temperaturaByDay > 20 && temperaturaByDay < 24){    
        numberOfBeerBox = Math.ceil((suscribers/numberOfBeerForBox));  
    } else if (temperaturaByDay < 20 ){    
        numberOfBeerBox = Math.ceil((suscribers*0.75)/numberOfBeerForBox); 
    }else if(temperaturaByDay > 24){    
        numberOfBeerBox = Math.ceil((suscribers*2)/numberOfBeerForBox);  
    }
    return numberOfBeerBox;
}


module.exports = {getTemperatureDayOfMeetup,getBeerBox} 