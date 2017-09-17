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
		let deposit = req.query.deposit;
		let key = req.query.key;

		console.log(ward, roomType, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key);


		var apaman = 'http://www.apamanshop.com/tokyo/';

		var apamanTest = 'http://www.apamanshop.com/tokyo/104/?madori=10-11-12-14-21-22&tinryo1=20000&tinryo2=100000&senyu1=15&senyu2=30&nensu=1&toho=7&chintai_plan=chintai';


		request(apamanTest, (err, res, html) => {
			if(!err){
					$ = cheerio.load(html);
					console.log(res.body);
			}
		})

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
