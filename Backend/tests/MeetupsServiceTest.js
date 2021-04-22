'use stricts'

let chai = require('chai');
let chaiHttp = require('chai-http');
const assert = require('chai').assert;
const Meetup = require('../model/meetup');

chai.use(chaiHttp);
const url= 'http://localhost:3001';
const meetup = {
	title: "user creator",
	description: "Testing user creator",
	availableVacancy: 10,
	totalVacancy: 10,
	date: "2021-06-20T00:00:00.000Z",
	location: "Buenos Aires",
	lat: "-31.4545",
	long: "-65.6454",
	userAdmin: "hlovey",
	userId: "1"
}


describe('Insert and retrieve Meetup: ',()=>{

	it('should retrieve created meetup', (done) => {
		chai.request(url)
			.post('/meetup')
			.send({
				title: meetup.title,
				description: meetup.description,
				availableVacancy: meetup.availableVacancy,
				totalVacancy: meetup.totalVacancy,
				date: meetup.date,
				location: meetup.location,
				lat: meetup.lat,
				long: meetup.long,
				username: meetup.userAdmin,
				userId: meetup.userId})
			.end( function(err,res){
				delete res.body["createdAt"];
           	 	delete res.body["updatedAt"];
				meetup["id"] = res.body.id;
				delete meetup["userId"];
				assert.deepEqual(res.body, meetup);
				done();
			});
	});

	//inicialmente hay dos meetups cargadas y 
	//por la creacion (del test anterior) este test deberia devolver tres meetups
	it('should retrieve 3 meetups', (done) => {
		chai.request(url)
			.get('/meetups')
			.end(function(err,res){
				assert.equal(res.body.length, 3,"Numbe of meetup : 1 --> ok");
				done();
			});
	});
	
	after(async () => {  
		await Meetup.destroy({where: {id: meetup.id}});
	})

});
