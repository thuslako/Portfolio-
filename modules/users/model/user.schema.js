var 
	restful			= 	require('node-restful'),
	mongoose		=	restful.mongoose;

var User = new mongoose.Schema({
	name: {type: String},
	email: {type: String, unique: true},
	password_hash: {type: String}
});


module.exports = restful.model('User', User);