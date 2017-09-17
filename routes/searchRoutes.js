const requireLogin = require('../middlewares/requireLogin');
const cheerio = require('cheerio');
const request = require('request');

module.exports = (app) => {

	app.get('/api/searchByWard', (req, res) => {
		let ward = req.query.ward;
		let roomType = req.query.roomType;
		let lowPrice = req.query.lowPrice;
		let highPrice = req.query.highPrice;
		let lowerRoom = req.query.lowerRoom;
		let higherRoom = req.query.higherRoom;

		console.log(ward, roomType, lowPrice, highPrice, lowerRoom, higherRoom);
		res.send(ward);
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
