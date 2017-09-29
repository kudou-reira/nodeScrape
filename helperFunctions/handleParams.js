const { conversionToString, conversionToRoom } = require('./data');

const createApamanLink = (ward, roomType, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key, age, distance) => {

	console.log("create link VERY BEGINNING", roomType)
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

const calculateRoomTypeGP = (val) => {

	var lowestString;
	var roomCode;
	var tempArray = val;
	var smallestVal;
	tempArray = tempArray.sort((a, b) => {
		return b - a
	});

	//smallestVal is a string
	smallestVal = Number(tempArray[0]);

	lowestString = conversionToString(smallestVal);
	roomCode = conversionToRoom(lowestString)


	console.log("roomCode", roomCode);

	return roomCode;
}

const roomsList = (val) => {

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
	]

	var temp = val;
	var list = [];

	for(var i = 0; i < temp.length; i++){
		for(var j = 0; j < data.length; j++){
			if(Number(temp[i]) === data[j].code){
				list.push(data[j].size);
			}
		}
	}

	return list;
}

module.exports = {
	createApamanLink,
	calculateRoomTypeGP,
	roomsList
}