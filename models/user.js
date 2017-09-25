const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	facebookId: String,
	twitterId: String,
	savedPlaces: [{
		buildingName: String,
		link: String,
		location: String,
		priceRange: String,
		propertiesAvailable: Number,
		averagePrice: Number
	}]
});

mongoose.model('users', userSchema);