
//dependenies 
var 
	express 		=	require('express'),
	https			=   require('https'),
	app				=	express(),
	bodyParser		=	require('body-parser'),
	mongoose		=	require('mongoose'),
	logger			=   require('morgan');

// setup port & db connection 
var 
	port = process.env.PORT || 3000,
	mongoose.connect('mongodb://localhost:27017/portfolio');

//middleware 
	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
	app.use(bodyParser.urlencoded({ extended: true }));

// expose given dir
	app.use(express.static(__dirname + '/public'));
	app.use(express.static(__dirname + '/views'));

// set Config 
var config = require('.config');
	app.set('superSecret', config.secret);

// routing middleware 

	app.use('/api', require('./modules/users/routes/app.js'));

	app.listen( port);
	console.log('server running well on port: '+ port);

	exports = module.exports = app;