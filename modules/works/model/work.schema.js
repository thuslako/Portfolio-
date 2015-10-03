var 
	restful			= 	require('node-restful'),
	mongoose		=	restful.mongoose;

var Work = new mongoose.Schema({
	title: {type: String},
	body: {type: String},
	created_at: {type: String},
	tags: {type: String}
});


module.exports = restful.model('work', Work);