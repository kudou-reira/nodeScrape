const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
	email: String,
	name: String
});

mongoose.model('profile', profileSchema);