const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const cheerio = require('cheerio');
const request = require('request');


require('./models/user');
require('./models/profile');
require('./services/passport');

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

var apaman = 'http://www.apamanshop.com/tokyo/';

var apamanTest = 'http://www.apamanshop.com/tokyo/104/?madori=10-11-12-14-21-22&tinryo1=20000&tinryo2=100000&senyu1=15&senyu2=30&nensu=1&toho=7&chintai_plan=chintai';

request(apamanTest, (err, res, html) => {
	if(!err){
		$ = cheerio.load(html);
		var array = [];

		var overallBox = $('.mod_box_section_bdt');
		// console.log(res.body);
		overallBox.each(function() {
			array.push({
				buildingName: $(this).find($('.name')).text(),
				link: 'http://www.apamanshop.com/' + $(this).find($('.box_head_result')).find($('a')).attr('href'),
				location: $(this).find($('.address')).text(),
				trainStation: $(this).find($('.list_info')).find($('li')).text(),
				priceRange: $(this).find($('.info')).find($('.price')).text(),
				propertiesAvailable: $(this).find($('tbody')).find($('tr')).length-$(this).find($('tbody')).find($('.tr_under')).length-1
			});
		});

		console.log(array);
	}
})




const PORT = process.env.PORT || 5000;
app.listen(5000);