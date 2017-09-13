const requireLogin = require('../middlewares/requireLogin');
const cheerio = require('cheerio');
const request = require('request');

module.exports = (app) => {

	app.get('/api/search', (req, res) => {

	});

	app.get('/api/save', requireLogin, async (req, res) => {

		console.log(req.user);

		// const charge = await;
		// req.user.credits += 5;
		// const user = await req.user.save();

		// res.send(user);

		// db.update ({'seraching criteria goes here ' },
		// {
		//  $set : {
		//           trk : [ {
		//                      "lat": 50.3293714,
		//                      "lng": 6.9389939
		//                   },
		//                   {
		//                      "lat": 50.3293284,
		//                      "lng": 6.9389634
		//                   }
		//                ]//'inserted Array containing the list of object'
		//       }
		// });
	});

	// console.log(req.body)
	// app.post('/api/stripe', (req, res) => {

	// });



}
