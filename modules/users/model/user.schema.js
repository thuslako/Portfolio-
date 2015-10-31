var 
	express 		= 	require( 'express' ),
	app				= 	express(),
	bcrypt			=	require('bcrypt'),
	mongoose		=	require('mongoose'),
	salt			=	bcrypt.genSaltSync(10);

var UserSchema = new  mongoose.Schema({
	name: {type: String},
	email: {type: String, unique: true},
	password_hash: {type: String, required: true}
});

var User = mongoose.model( 'User', UserSchema );

module.exports = User;