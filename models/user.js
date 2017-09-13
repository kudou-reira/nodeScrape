const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	facebookId: String,
	twitterId: String,
	savedPlaces: [{
		address: String,
		price: Number,
		roomType: String
	}]
});

mongoose.model('users', userSchema);