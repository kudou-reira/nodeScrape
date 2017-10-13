const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const cheerio = require('cheerio');
const request = require('request');
var cluster = require('cluster');

require('./models/user');
require('./models/profile');
require('./services/passport');


if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} 

else {
	mongoose.connect(keys.mongoURI);

	const app = express();

	app.use(bodyParser.json());
	//sign cookie key
	app.use(
		cookieSession({
			maxAge: 30 * 24 * 60 * 60 * 1000,
			keys: [keys.cookieKey]
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());

	// app.get('/', (req, res) => {
	// 	res.send({ hi: 'there'});
	// })

	// https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=392761899936-7pdlrteoqgr9coh9803ihjkh1upnqqbt.apps.googleusercontent.com

	require('./routes/authRoutes')(app);
	require('./routes/searchRoutes')(app);
	require('./routes/manageRoutes')(app);

	if(process.env.NODE_ENV === 'production'){
		app.use(express.static('client/build'));

		const path = require('path');
		app.get('*', (req, res) => {
			res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
		});
	}

    app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})

    const PORT = process.env.PORT || 5000;
	// app.listen(PORT);
    server = app.listen(PORT, function() {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
}

