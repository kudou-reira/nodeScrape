var _ = require('lodash');

const conversionToGPCode = (value) => {
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

	var temp = value;
	var list = [];

	for(var i = 0; i < temp.length; i++){
		for(var j = 0; j < data.length; j++){
			if(temp[i] === data[j].size){
				list.push(data[j].code);
			}
		}
	}

	return list;
}

const conversionToApamanCode = (value) => {
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

	var temp = value;
	var list = [];

	for(var i = 0; i < temp.length; i++){
		for(var j = 0; j < data.length; j++){
			if(temp[i] === data[j].size){
				list.push(data[j].code);
			}
		}
	}

	return list;
}

const conversionToApamanCity = (value) => {
	var data = [
		{city: 'Chiyoda', code: 101},
		{city: 'Chuo', code: 102},
		{city: 'Minato', code: 103},
		{city: 'Shinjuku', code: 104},
		{city: 'Bunkyou', code: 105},
		{city: 'Taitou', code: 106},
		{city: 'Sumida', code: 107},
		{city: 'Kotou', code: 108},
		{city: 'Shinagawa', code: 109},
		{city: 'Meguro', code: 110},
		{city: 'Outa', code: 111},
		{city: 'Setagaya', code: 112},
		{city: 'Shibuya', code: 113},
		{city: 'Nakano', code: 114},
		{city: 'Suginami', code: 115},
		{city: 'Toshima', code: 116},
		{city: 'Kita', code: 117},
		{city: 'Arakawa', code: 118},
		{city: 'Itabashi', code: 119},
		{city: 'Nerima', code: 120},
		{city: 'Adachi', code: 121},
		{city: 'Katsushika', code: 122},
		{city: 'Edogawa', code: 123}
	]

	var temp = value;
	var list = [];

	for(var i = 0; i < temp.length; i++){
		for(var j = 0; j < data.length; j++){
			if(temp[i] === data[j].city.toLowerCase()){
				list.push(data[j].code);
			}
		}
	}

	return list;
}

module.exports = {
	conversionToGPCode,
	conversionToApamanCode,
	conversionToApamanCity
}