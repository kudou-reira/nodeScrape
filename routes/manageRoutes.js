const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {

	app.post('/api/save', requireLogin, async (req, res) => {

		console.log('this is from manageRoutes');
		let card = req.body.params.card;

		console.log("this is user", req.user);
		console.log("this is card", card);

		req.user.savedPlaces.push(card);

		const user = await req.user.save();

		res.send(user);
	});

	app.post('/api/delete', requireLogin, async (req, res) => {

		let card = req.body.params.card;

		console.log("this is card from api delete", card);

		req.user.savedPlaces.remove({"_id": card._id});

		const user = await req.user.save();

		res.send(user);
	});

}
