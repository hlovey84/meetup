const Rol = require('../model/roles');
const json = require('body-parser/lib/types/json');
const axios = require('axios');
const roles = require('../model/roles');

module.exports = {
    /*Lista los roles de usuario*/
   async getRoles(req, res) {
        res.json(roles);
    },
    
    async getCountries(req, res){
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            res.json(response.data);
        }).catch(error => {
            res.json(error);
        });
    }

}