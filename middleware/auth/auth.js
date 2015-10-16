	 var
	  app				  = require('express')(),
	  jwt       		  = require('jsonwebtoken'),
      User                = require('../../modules/users/model/user.schema');

// config for secert
var 
	config = require('../../config');
	app.set('superSecret', config.secret);


var auth = {
	// auth user 
	AuthUser: function(req,res,next){
		console.log('called to check user');
		User.findOne({
		    email: req.body.email
		}, function(err, user) {

			if (err) throw err;
		    if (!user) {
		      res.end('wrong password or username dude', 400);
		    } else if (user) {
		      // check if password matches
		      if (user.password_hash != req.body.password_hash) {
		       res.end('wrong password or username yo', 400);
		      } else {
			        var token = jwt.sign(user.name, app.get('superSecret'), {
			          expiresInMinutes: 1440 // expires in 24 hours
			        });
			        // return the information including token as JSON
			        res.json({ token: token});
				 }  
		   }
		});

	},
	// checks token if valid 
	ValidateToken: function(req,res,next){
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		  // decode token
		  if (token) {
		    // verifies secret and checks exp
		    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
		      if (err) {
		        return res.json({ success: false, message: 'Failed to authenticate token.' });    
		      } else {
		        // if everything is good, save to request for use in other routes
		        req.decoded = decoded;    
		        next();
		      }
		    });

		  } else {

		    res.status(401);
		    res.json({
		      "status": 401,
		      "message": "Invalid Token or Key"
		    });
		    return;
		 }
	} 

};

module.exports  = auth;