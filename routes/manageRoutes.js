const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
require('../models/user');
const User = mongoose.model('users');

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

	app.post('/api/deleteCollapse', requireLogin, async (req, res) => {

		let card = req.body.params.card;

		console.log("this is card from api delete", card);

		req.user.savedPlaces.remove({_id: card._id});

		const user = await req.user.save();

		res.send(user);
	});

	app.post('/api/deleteModal', requireLogin, async (req, res) => {

		let card = req.body.params.card;
		
		console.log("this is card from api delete modal", card);

		var newSavedPlaces = req.user.savedPlaces.filter((place) => {
			return place.link !== card.link
		})

		console.log("deleteModal", newSavedPlaces);

		req.user.savedPlaces = newSavedPlaces;

		const user = await req.user.save();

		res.send(user);
	});

}
