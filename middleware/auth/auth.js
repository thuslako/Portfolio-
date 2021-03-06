//--- loading required packages 
var
	  app				  = require('express')(),
	  jwt       		  = require('jsonwebtoken'),
	  bcrypt			  =	require('bcrypt'),
      User                = require('../../modules/users/model/user.schema');

// config for secert
var 
	config = require('../../config');
	app.set('superSecret', config.secret);

// auth class for middleware to auth user
var auth = {
	// auth user 
	AuthUser: function(req,res,next){
		User.findOne({
		    email: req.body.email
		}, function(err, user) {

			if (err) throw err;
		    if (!user) {
		     res.status(401).send('wrong email or password');
		    } else if (user) {
		    	console.log('unhashed : ',req.body.password_hash);
		    	console.log('hashed : ',user.password_hash);
		      if (!bcrypt.compareSync(req.body.password_hash, user.password_hash) ) {
		              res.status(401).send('wrong password');
		      } else {
			     var token = jwt.sign(user._id, app.get('superSecret'), {
			          expiresIn: 60000 
			        });
			        res.json(token);
			  }  
		   }
		});

	},
	// checks token if valid 
	ValidateToken: function(req,res,next){

		var token = req.headers.authorization||req.body.token || req.query.token || req.headers['auth-token'];

		  // decode token
		  if (token && token.split(' ')[0] === 'Bearer') {
		    // verifies secret and checks exp
		    jwt.verify(token.split(' ')[1], app.get('superSecret'), function(err, decoded) {      
		      if (err) {
		        return res.json({ success: false, message: 'Failed to authenticate token.' });    
		      } else {
		        // if everything is good, save to request for use in other routes
		        req.decoded = decoded;   
		        next();
		      }
		    });

		  } else {

		    res.status(401).json('No access to this page').end();
		 }
	} 

};

module.exports  = auth;