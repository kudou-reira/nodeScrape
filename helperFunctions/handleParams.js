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
	console.log("this is room type", roomType);

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

module.exports = {
	createApamanLink
}