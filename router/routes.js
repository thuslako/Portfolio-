'use strict';
// loading require
var 
	  app				  = require('express')(),
	  auth       		  = require('../middleware/auth/auth'),
	  router			  = require('express').Router(),
	  bcrypt			  =	require('bcrypt'),
	  salt			 	  =	bcrypt.genSaltSync(10), 
      User                = require('../modules/users/model/user.schema'),
      Work                = require('../modules/works/model/work.schema');


//-- linking Get User Schema to router
router.route('/admin/users').get(function(req,res){
		 console.log('getting ');
		User.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
});
//-- linking Post User Schema to router 
router.route('/admin/users').post(function(req,res){
		 
		
		var user = new User();		// create a new instance of the Bear model
		user.name = req.body.name;  // set the bears name (comes from the request)
		user.password_hash = bcrypt.hashSync(req.body.password_hash, salt);
		user.email = req.body.email;

		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'User created!' });
		});
});

//--- auth middle to catch any request
router.use('/auth',auth.AuthUser);
//--- exposing the work get route to client 
Work.methods(['get']);
//-- linking Work Schema get to router
Work.register(router,'/admin/work');
//--- locking down anyone access from unauthorized access 
router.use('/admin/*',auth.ValidateToken);

//-- linking Work Schema post put delete to router
Work.register(router,'/admin/work');


//returning routing config 
module.exports = router;
