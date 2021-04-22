var express = require('express');
var router = express.Router();
var Meetup = require('../model/meetup');
var User = require('./user');


const meetups = [{
    "title": "Finanzas",
    "description": "Curso de finanzas",
    "availableVacancy": "20",
    "totalVacancy": "34",
    "date": "2021-05-16",
    "location": "Tucumán, Provincia de Tucumán, Argentina",
    "lat": "-26.8082848",
    "long": "-65.2175903",
    "userAdmin": "hlovey"
},
{
    "title": "Fondos comunes de inversiones",
    "description": "Te enseñamos a invertir en Fondos Comunes de Inversion",
    "availableVacancy": "20",
    "totalVacancy": "34",
    "date": "2021-05-16",
    "location": "Buenos Aires, CABA, Argentina",
    "lat": "-34.6036844",
    "long": "-34.6036844",
    "userAdmin": "hlovey"
}];

const Users = [{
    "name": "Hernan",
    "lastname": "Lovey",
    "username": "hlovey",
    "email": "hernanlovey@gmail.com",
    "country": "argentina",
    "password": "nancho8w",
    "rol":"Administrator"
  },
  {
    "name": "juan",
    "lastname": "perez",
    "username": "jperez",
    "email": "jperez@gmail.com",
    "country": "argentina",
    "password": "nancho8w",
    "rol":"Administrator"
  },
  {
    "name": "pedro",
    "lastname": "gomez",
    "username": "pgomez",
    "email": "pgomez@gmail.com",
    "country": "argentina",
    "password": "nancho8w",
    "rol":"Administrator"
  },
  {
    "name": "adrian",
    "lastname": "gonzalez",
    "username": "agonza",
    "email": "agonza@gmail.com",
    "country": "argentina",
    "password": "nancho8w",
    "rol":"Administrator"
  },
  {
    "name": "guido",
    "lastname": "duran",
    "username": "gduran",
    "email": "gduran@gmail.com",
    "country": "argentina",
    "password": "nancho8w",
    "rol":"Administrator"
  },
  {
    "name": "roberto",
    "lastname": "pereira",
    "username": "rpereira",
    "email": "rpereira@gmail.com",
    "country": "argentina",
    "password": "nancho8w",
    "rol":"Administrator"
  },
  {
    "name": "leandro",
    "lastname": "fake",
    "username": "lfake",
    "email": "lfake@gmail.com",
    "country": "argentina",
    "password": "nancho8w",
    "rol":"Administrator"
  }];
  module.exports = {
    init(){
    for(i=0; i<meetups.length; i++){
        Meetup.create({
            title: meetups[i].title,
            description: meetups[i].description,
            availableVacancy: meetups[i].totalVacancy,
            totalVacancy: meetups[i].totalVacancy,
            date: meetups[i].date,
            location: meetups[i].location,
            lat: meetups[i].lat,
            long: meetups[i].long,
            userAdmin: meetups[i].userAdmin
        })
    }

    for(i=0; i<Users.length; i++){
        User.create({
            password: Users[i].password,
            name: Users[i].name,
            lastname: Users[i].lastname,
            username: Users[i].username,
            email: Users[i].email,
            country: Users[i].country,
            rol: Users[i].rol
        })
    }
  }
}

