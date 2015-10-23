var 
	restful			= 	require('node-restful'),
	mongoose		=	restful.mongoose;

var User = restful.model('User', mongoose.Schema({
	name: {type: String},
	email: {type: String, unique: true},
	password_hash: {type: String}
})).methods(['get', 'post', 'put', 'delete']);


module.exports = User;