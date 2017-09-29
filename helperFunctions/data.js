var _ = require('lodash');

const conversionToString = (value) => {
	var data = [
		{size: '1R', code: 10},
		{size: '1K', code: 11},
		{size: '1DK', code: 12},
		{size: '1LDK', code: 14},
		{size: '2K', code: 21},
		{size: '2DK', code: 22},
		{size: '2LDK', code: 24},
		{size: '3K', code: 31},
		{size: '3DK', code: 32},
		{size: '3LDK', code: 34},
		{size: '4K', code: 41},
		{size: '4DK', code: 42},
		{size: '4LDK', code: 44},
		{size: '5K+', code: 51}
	];

	var lowestString = _.find(data, (place) => {
		return(
			place.code === value
		);
	});

	return lowestString.size;
}

const conversionToRoom = (value) => {
	var data = [
		{size: '1R', code: 4},
		{size: '1K', code: 5},
		{size: '1DK', code: 10},
		{size: '1LDK', code: 15},
		{size: '2K', code: 20},
		{size: '2DK', code: 25},
		{size: '2LDK', code: 30},
		{size: '3K', code: 35},
		{size: '3DK', code: 40},
		{size: '3LDK', code: 45},
		{size: '4K', code: 50},
		{size: '4DK', code: 55},
		{size: '4LDK', code: 60},
		{size: '5K+', code: 65}
	]

	var roomCode = _.find(data, (place) => {
		return(
			place.size === value
		);
	});

	return roomCode.code;
}

module.exports = {
	conversionToString,
	conversionToRoom
}