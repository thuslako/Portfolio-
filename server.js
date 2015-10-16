
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
	mongoose.connect('mongodb://localhost:27017/portfolio');

//middleware 
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
	app.use(bodyParser.urlencoded({ extended: true }));

// expose given dir
	app.use(express.static(__dirname + '/public'));
	app.get('/*',function(req,res,next){
		res.sendfile('index.html',{root:__dirname +'/public' })
	});

// routing middleware 
	app.use('/api/admin/*',require('./middleware/auth/auth').ValidateToken);
	app.use('/', require('./router/routes'));

	app.use('/*',function(err,req, res, next) {
	  res.json(404,'Not Found');
	});

	app.listen( port);
	console.log('server running well on port: '+ port);

	exports = module.exports = app;