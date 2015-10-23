var 
	  app				  = require('express')(),
	  auth       		  = require('../middleware/auth/auth'),
	  router			  = require('express').Router(),
      User                = require('../modules/users/model/user.schema'),
      Work                = require('../modules/works/model/work.schema');


router.use('/auth',auth.AuthUser);
router.use('/admin/*',auth.ValidateToken);
User.register(router,'/admin/users');

module.exports = router;
