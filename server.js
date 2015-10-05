
//dependenies 
var 
	express 		=	require('express'),
	https			=   require('https'),
	app				=	express(),
	bodyParser		=	require('body-parser'),
	mongoose		=	require('mongoose'),
	logger			=   require('morgan');
// set Config 
var config = require('./config');
	app.set('superSecret', config.secret);

// setup port & db connection 
var 
	port = process.env.PORT || 3000;
	mongoose.connect('mongodb://192.168.0.23:27017/portfolio');

//middleware 
	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
	app.use(bodyParser.urlencoded({ extended: true }));

// expose given dir
	app.use('/css',express.static(__dirname + '/css'));
	app.use('/libs',express.static(__dirname + '/libs'));
	app.use('/js',express.static(__dirname + '/js'));
	app.use('/views',express.static(__dirname + '/views'));
	app.use('/public',express.static(__dirname + '/public'));

// routing middleware 
	app.all('/*',function(req,res,next){
		res.sendFile('public/index.html', { root: __dirname});
	});
	app.use('/api', require('./modules/users/routes/app.js'));

	app.listen( port);
	console.log('server running well on port: '+ port);

	exports = module.exports = app;