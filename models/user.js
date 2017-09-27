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
		averagePrice: Number,
		trainStation: [{type: String}],
		inDatabase: { type: Boolean, default: true},
		apaman: Boolean,
		gaijinPot: Boolean
	}]

});

mongoose.model('users', userSchema);