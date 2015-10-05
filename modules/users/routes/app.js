var 
	  app				  = require('express')(),
	  jwt       		  = require('jsonwebtoken'),
	  router			  = require('express').Router(),
      User                = require('../model/user.schema');


var 
	config = require('../../../config');
	app.set('superSecret', config.secret);

	// route middleware to verify a token
router.post('/auth', function(req, res) {
	User.findOne({
	    email: req.body.email
	}, function(err, user) {

		if (err) throw err;
	    if (!user) {
	      res.end('wrong password or username', 400);
	    } else if (user) {
	      // check if password matches
	      if (user.password_hash != req.body.password) {
	       res.end('wrong password or username', 400);
	      } else {

		        // if user is found and password is right
		        // create a token
		        var token = jwt.sign(user.name, app.get('superSecret'), {
		          expiresInMinutes: 1440 // expires in 24 hours
		        });

		        // return the information including token as JSON
		        res.json({
		          success: true,
		          message: 'Enjoy your token!',
		          user: 'Welcome '+user.name,
		          token: token
		        });
			 }   
	   }
	});
});
router.use(function(req, res, next) {
	  // check header or url parameters or post parameters for token
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

	    // if there is no token
	    // return an error
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
	    
	  }
});
router.get('/name', function(req, res) {
	res.json({name: 'lukundu'});
});
module.exports = router;
