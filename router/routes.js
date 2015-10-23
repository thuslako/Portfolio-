var 
	  app				  = require('express')(),
	  auth       		  = require('../middleware/auth/auth'),
	  router			  = require('express').Router(),
      User                = require('../modules/users/model/user.schema'),
      Work                = require('../modules/works/model/work.schema');


router.use('/auth',auth.AuthUser);
Work.methods(['get']);
Work.register(router,'/admin/work');
router.use('/admin/*',auth.ValidateToken);
Work.methods(['post', 'put', 'delete']);
User.register(router,'/admin/users');
Work.register(router,'/admin/work');

module.exports = router;
