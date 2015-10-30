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

// .before('post', function(req,res,next){
// 	console.log('posting and hashing')
// 	req.body.password_hash = bcrypt.hashSync(User.password_hash, salt);
// 	next();

// });


function hashpassword (req,res,next) {

	bcrypt.hash(User.password_hash, salt, function(err, hash) {
			if(err) res.json('error: ',err).end();
			req.body.password_hash = hash;
			next();
	});
}		



module.exports = User;