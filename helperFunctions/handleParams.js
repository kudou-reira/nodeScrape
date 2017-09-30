const { conversionToGPCode, conversionToApamanCode, conversionToApamanCity } = require('./data');

const createApamanLink = (ward, roomType, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key, age, distance) => {

	var wardFormat = '';
	var roomTypeFormat = '';

	for(var i = 0; i < ward.length; i++){
		if(i === ward.length-1){
			wardFormat += ward[i];
		}

		else{
			wardFormat += ward[i] + '-'
		}
	}

	var roomType = roomType.sort(function(a, b){return a - b});
	console.log("this is room type from handle params", roomType);

	for(var i = 0; i < roomType.length; i++){
		if(i === roomType.length-1){
			roomTypeFormat += roomType[i];
		}

		else{
			roomTypeFormat += roomType[i] + '-'
		}
	}

	var apamanLinkParts = {
						city: 'http://www.apamanshop.com/tokyo/',
						ward: `${wardFormat}/`,
						roomType: `&madori=${roomTypeFormat}`,
						prices: `&tinryo1=${lowPrice}&tinryo2=${highPrice}`,
						roomSpace: `&senyu1=${lowerRoom}&senyu2=${higherRoom}`,
						yearsOld: `&nensu=${age}`,
						walkingDistance: `&toho=${distance}`,
						roomPlan: '&chintai_plan=chintai',
						depositMoney: '&shikikin_nashi=on',
						keyMoney: '&reikin_nashi=on'
					 };

	var dataArray = [];

	console.log("this is deposit", deposit);
	console.log("this is key", key);

	if(deposit === 'true' && key == 'true'){
		for(var o in apamanLinkParts){
			dataArray.push(apamanLinkParts[o]);
		}
	}

	else if(deposit === 'true' && key == 'false'){
		delete apamanLinkParts.depositMoney;
		for(var o in apamanLinkParts){
			dataArray.push(apamanLinkParts[o]);
		}
	}

	else if(deposit === 'false' && key == 'true'){
		delete apamanLinkParts.keyMoney;
		for(var o in apamanLinkParts){
			dataArray.push(apamanLinkParts[o]);
		}
	}

	else if(deposit === 'false' && key == 'false'){
		delete apamanLinkParts.depositMoney;
		delete apamanLinkParts.keyMoney;
		for(var o in apamanLinkParts){
			dataArray.push(apamanLinkParts[o]);
		}
	}
	
	return dataArray;
}

const createGPLink = (ward, roomType, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key, age, distance) => {

	var wardFormat = '';
	var roomTypeFormat = '';



	var roomType = roomType.sort(function(a, b){return a - b});

	wardFormat = ward
	roomTypeFormat = roomType[0];

	var apamanLinkParts = {
						city: 'https://apartments.gaijinpot.com/en/rent/listing?',
						prefecture: '&prefecture=JP-13',
						ward: `&city=${wardFormat}`,
						roomType: `&rooms=${roomTypeFormat}`,
						prices: `&min_price=${lowPrice}&max_price=${highPrice}`,
						roomSpace: `&min_meter=${lowerRoom}`,
						yearsOld: `&building_age=${age}`,
						walkingDistance: `&distance_station=${distance}`,
						roomPlan: '&building_type=mansion-apartment',
						depositMoney: '&no_deposit=1',
						keyMoney: '&no_key_money=1'
					 };

	var dataArray = [];

	console.log("this is deposit", deposit);
	console.log("this is key", key);

	if(deposit === 'true' && key == 'true'){
		for(var o in apamanLinkParts){
			dataArray.push(apamanLinkParts[o]);
		}
	}

	else if(deposit === 'true' && key == 'false'){
		delete apamanLinkParts.depositMoney;
		for(var o in apamanLinkParts){
			dataArray.push(apamanLinkParts[o]);
		}
	}

	else if(deposit === 'false' && key == 'true'){
		delete apamanLinkParts.keyMoney;
		for(var o in apamanLinkParts){
			dataArray.push(apamanLinkParts[o]);
		}
	}

	else if(deposit === 'false' && key == 'false'){
		delete apamanLinkParts.depositMoney;
		delete apamanLinkParts.keyMoney;
		for(var o in apamanLinkParts){
			dataArray.push(apamanLinkParts[o]);
		}
	}
	
	return dataArray;
}

const gpRoomCode = (value) => {

	var tempArray = value;
	var roomCode;

	tempArray = tempArray.sort((a, b) => {
		return b - a
	});

	roomCode = conversionToGPCode(tempArray);

	return roomCode;
}

const apamanCity = (value) => {
	var tempArray = value;
	var city;

	tempArray = tempArray.sort((a, b) => {
		return b - a
	});

	city = conversionToApamanCity(tempArray);

	return city;
}

const apamanRoomCode = (value) => {
	return conversionToApamanCode(value);
}

module.exports = {
	createGPLink,
	gpRoomCode,
	createApamanLink,
	apamanCity,
	apamanRoomCode
}