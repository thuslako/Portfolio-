var 
	express 		=	require('express'),
	https			=   require('https'),
	app				=	express(),
	bodyParser		=	require('body-parser'),
	passport      	= 	require('passport'),
	mongoose		=	require('mongoose');


var port = process.env.PORT || 3000;

	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(express.static(__dirname + '/public'));

	require('./modules/users/server/passport')(passport);
	app.use('/api/auth',passport.authenticate('jwt', { session: false}),
	    function(req, res) {
	        res.send("auto");
	    }
	);

	app.listen( port);
	console.log('server running well on port'+ port);

	exports = module.exports = app;