const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {

	app.post('/api/save', requireLogin, async (req, res) => {

		let card = req.query.card;

		console.log("this is user", req.user);
		console.log("this is card", card);

		req.user.savedPlaces.push(card);

		const user = await req.user.save();

		res.send(user);

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

}
