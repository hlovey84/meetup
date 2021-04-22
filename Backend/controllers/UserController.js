'use strict'
const User = require('../model/user');
const Roles = require('../model/roles');
const sequelize = require('../database/sqlite_connection');
const Meetup = require('../model/meetup');

module.exports = {
    async createUser(req, res) {
        await User.count({
            where: {
              email: req.body.email
            }
          }).then(count => {
              if (count != 0){
                 console.log("El user ya existe");
                 res.json({error:'El email ya existe'});
              }else{
                    User.create({
                        password: req.body.password,
                        name: req.body.name,
                        lastname: req.body.lastname,
                        username: req.body.username,
                        email: req.body.email,
                        country: req.body.country,
                        rol: Roles[req.body.rol]
                    }).then(user => res.json(user));
              }
          }).catch(function(error){
             res.json(error);
          });
    },
    async getAllUsers(req, res) {
        let users = await User.findAll();
        res.json(users);
    },

    async getUser(req, res) {
        let user = await User.findByPk(req.params.user);
        res.json(user);
    },
    
    async login(req, res){
        const user = await User.findOne({
            where: {
                username: req.body.user,
                password: req.body.password
            }
        });

        if(user !== null){
            // user.setAttributes("result","success");
            res.json(user.setAttributes("result","success"));
        }else{
            res.json({"result": "error","error": "User not found"});
        }
    }
}