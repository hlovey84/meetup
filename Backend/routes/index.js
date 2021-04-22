var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');
const MeetupController = require('../controllers/MeetupController');
const DatosParametricosController = require('../controllers/ParametricDataController');

router.get('/data/countries',DatosParametricosController.getCountries);

router.get('/data/roles',DatosParametricosController.getRoles);

router.get('/user/:user',UserController.getUser);

router.get('/users/all',UserController.getAllUsers);

router.post('/user', UserController.createUser);

router.post('/meetup', MeetupController.createMeetup);

// router.get('/meetup/user/:user/all', MeetupController.getAllMeetupsOfUser);

router.post('/subscriptions/meetups/:meetup/users/:user', MeetupController.subscribeMeetup);

router.get('/meetup/administrator/:administrator', MeetupController.findAll);

router.get('/meetups', MeetupController.getAllMeetups);


router.get('/meetup/user/:user', MeetupController.findAllMeetupByUser);

router.post('/login', UserController.login);

module.exports = router;
