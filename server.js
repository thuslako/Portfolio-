var 
	express 		=	require('express'),
	app				=	express(),
	bodyParser		=	require('body-parser'),
	mongoose		=	require('mongoose');


var port = process.env.PORT || 3000;

	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(express.static(__dirname + '/public'));

	app.use('/',function(req,res){
		console.log('request made')
	});

	app.listen( port);
	console.log('server running well on port'+ port);

	exports = module.exports = app;