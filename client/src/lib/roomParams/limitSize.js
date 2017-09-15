const generateLowerRoomLimits = () => {
	var collection = [];
	var tempCollection = generateLimit(collection);
	tempCollection.unshift({
		label: 'No Lower Limit',
		size: 0
	});
	return tempCollection;
}

const generateHigherRoomLimits = () => {
	var collection = [];
	var tempCollection = generateLimit(collection);
	tempCollection.push({
		label: 'No Higher Limit',
		size: 99999
	});
	return tempCollection;
}

const generateLimit = (collection) => {
	var start = 15;
	while(start <= 50){
		collection.push(start);
		start += 5;
	}

	var start2 = 60;

	while(start2 <= 100){
		collection.push(start2);
		start2 += 10;
	}

	collection = collection.map((value) => {
		return {
			label: value,
			size: value
		}
	})

	return collection;
}

module.exports = {
	generateLowerRoomLimits,
	generateHigherRoomLimits
}