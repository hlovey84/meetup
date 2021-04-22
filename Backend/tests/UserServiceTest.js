'use stricts'

let chai = require('chai');
let chaiHttp = require('chai-http');
const assert = require('chai').assert;
const User = require('../model/user');
const Rol = require('../model/roles');

chai.use(chaiHttp);
const url= 'http://localhost:3001';

const user = {
	name: "Laura",
    lastname: "Perez",
    username: "lperez",
    email: "lperez@gmail.com",
    country: "argentina",
    password: "123",
    rol:"adm"
}


var _this = this;
describe('Insert and retrieve User: ',()=>{

	it('should retrieve usar id 1', (done) => {
		chai.request(url)
			.post('/user')
			.send(user)
			.end(function(err,res){
				user.rol = Rol[user.rol];
				user["id"]= res.body.id;
				delete res.body["createdAt"];
				delete res.body["updatedAt"];
				assert.deepEqual(res.body,user);
				done();
			});
	});

	after(async () => {  
		await User.destroy({where: {id: user.id}});
	})


});
