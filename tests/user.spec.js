//connecting to mongodb 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/parts');

var expect = require('chai').expect;

//calling data model 
var Users = require('../modules/users//model/user.schema');

describe('User model', function(){


	it('should create new part',function(done){
		Users.create({
			name: 'Lukundu Lako',
			email: 'lukundu@gmail.com',
			password_hash: 'test',
		},function(err,user){
			expect(user.password_hash).to.exist;
			done();
		});
	});


	it('should require missing fields',function(done){
		Users.find(function(err,users){
            expect(users);
			done();
		});

	});

	after(function(done){
		Users.remove(done);
	});
});