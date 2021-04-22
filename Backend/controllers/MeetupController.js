const User = require('../model/user');
const Meetup = require('../model/meetup');
const Meetup_user = require('../model/user_meetup');
const Roles = require('../model/roles');
const json = require('body-parser/lib/types/json');
const user_meetup = require('../model/user_meetup');
const WeatherApi = require('./WeatherApi');
const sequelize = require('sequelize');

module.exports = {
   async createMeetup(req, res) {
        const meetup = await Meetup.create({
            title: req.body.title,
            description: req.body.description,
            availableVacancy: req.body.totalVacancy,
            totalVacancy: req.body.totalVacancy,
            date: req.body.date,
            location: req.body.location,
            lat: req.body.lat,
            long: req.body.long,
            userAdmin: req.body.username
        }).then(async meetup =>{
             const user = await User.findByPk(req.body.userId);
             //user.addMeetup(meetup,{through: { rol: Roles.adm}});
             let userMeetup = await User.findOne({
              where:{
                  id: req.body.userId
             },
              include:'meetup'
            });
            res.json(meetup);
        }).catch(error =>{
            res.json({"result": "error","error": error.message});
        });
    },

    async subscribeMeetup(req, res) {
        await Meetup.findByPk(req.params.meetup)
                    .then(async meetup =>{
                        const user = await User.findByPk(req.params.user);
                        const availableVacancy = meetup.dataValues["availableVacancy"]-1;
                        user.addMeetup(meetup,{through: { rol: Roles.scp}});
                        await Meetup.update({
                            availableVacancy: availableVacancy
                        },{
                            where:{
                                id: req.params.meetup
                            }
                        }
                        );
                        let userMeetup = await User.findOne({
                            where:{
                                id: req.params.user
                            },
                            include:'meetup'
                        });
                        res.json(userMeetup);
                    })
                    .catch(error =>{
                        res.json(error);
                    });
    },

    async findAllMeetupByUser(req, res) {
        await User.findAll({
            where: {
                Id: req.params.user,
                rol: Roles.scp
            },
            include : 'meetup'
        }).then(user => {
            if(user !== null){
                res.json(user);
            }else{
                res.json({'error':'The User is not registered'});
            }
        }).catch(error => {
            res.json(error);
        })
    },

    async findAll(req, res){
        await User.findAll({
            where: {
                rol: Roles.adm
            },
            include : 'meetup'
        }).then(user => {
            if(user !== null){
                res.json(user);
            }else{
                res.json({'error':'The Administrator is not registered'});
            }
        }).catch(error => {
            res.json(error);
        })
    },

    async getAllMeetups(req, res){
        const meetups = await Meetup.findAll({ include: 'user' });
        for( i=0; i<meetups.length;i++){
            let meetup = meetups[i];
           await WeatherApi.getTemperatureDayOfMeetup(meetup.dataValues["location"],meetup.dataValues["long"],meetup.dataValues["lat"])
                      .then((result) => {
                        meetup.dataValues["temperature"] = (!result.body.list) ? ("service not available, try later", meetup.dataValues["beerBox"]="not available") : (!result.body.list[0] ?  ("invalid location", meetup.dataValues["beerBox"]="not available") : result.body.list[0].main.temp);
                        if(!meetup.dataValues["beerBox"])
                            meetup.dataValues["beerBox"] = WeatherApi.getBeerBox(meetup, result.body.list[0].main.temp);
                    }).catch((error) => {
                        console.log(error);
                    })
    }
        res.json(meetups);
    }
}