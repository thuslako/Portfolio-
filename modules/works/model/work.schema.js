var 
	restful			= 	require('node-restful'),
	mongoose		=	restful.mongoose;

var Work = restful.model('Work', mongoose.Schema({
	title: {type: String},
	body: {type: String},
	created_at: {type: String},
	tags: {type: Array},
	imgs: [{
			img_title:{ type: String},
			img: { data: Buffer, contentType: String }
		  }]
}));



module.exports = Work;