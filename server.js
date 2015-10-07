
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
	mongoose.connect('mongodb://192.168.0.24:27017/portfolio');

//middleware 
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
	app.use(bodyParser.urlencoded({ extended: true }));
// expose given dir
	app.use('/css',express.static(__dirname + '/public/css'));
	app.use('/libs',express.static(__dirname + '/public/libs'));
	app.use('/js',express.static(__dirname + '/public/js'));
	app.use('/views',express.static(__dirname + '/public/views'));
	app.use('/public',express.static(__dirname + '/public'));

// routing middleware 
	app.use('/api/admin/*',require('./middleware/auth/auth').ValidateToken);
	app.use('/', require('./router/routes'));

	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});
	app.listen( port);
	console.log('server running well on port: '+ port);

	exports = module.exports = app;