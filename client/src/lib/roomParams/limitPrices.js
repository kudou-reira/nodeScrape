const generateLowerLimits = () => {
	var collection = [];
	collection.push(0);

	var start = 2;
	while(start <= 10){
		collection.push(start);
		start += 0.5;
	}

	var start2 = 11;

	while(start2 <= 15){
		collection.push(start2);
		start2 += 1;
	}

	collection.push(20);
	collection.push(30);
	collection.push(50);
	collection.push(100);

	collection = collection.map((value) => {
		return {
			label: value,
			price: value*10000
		}
	})

	return collection;
}

const generateHigherLimits = () => {
	var collection = [];

	var start = 2;
	while(start <= 10){
		collection.push(start);
		start += 0.5;
	}

	var start2 = 11;

	while(start2 <= 15){
		collection.push(start2);
		start2 += 1;
	}

	collection.push(20);
	collection.push(30);
	collection.push(50);
	collection.push(100);

	collection = collection.map((value) => {
		return {
			label: value,
			price: value*10000
		}
	})

	collection.push({
		label: 'No Limit',
		price: 9999999
	});

	return collection;
}

module.exports = {
	generateLowerLimits,
	generateHigherLimits
}