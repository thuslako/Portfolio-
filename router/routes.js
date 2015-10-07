var 
	  app				  = require('express')(),
	  auth       		  = require('../middleware/auth/auth'),
	  router			  = require('express').Router(),
      User                = require('../modules/users/model/user.schema'),
      Work                = require('../modules/works/model/work.schema');


router.use('/api/auth',auth.AuthUser);

User.methods(['get', 'post', 'put', 'delete']);
User.register(router,'/api/admin/users');

Work.methods(['get', 'post', 'put', 'delete']);
Work.register(router,'/api/admin/works');


module.exports = router;
