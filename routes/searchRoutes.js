const requireLogin = require('../middlewares/requireLogin');
const cheerio = require('cheerio');
const request = require('request');
const async = require('async');
const { createGPLink, gpRoomCode, createApamanLink, apamanCity, apamanRoomCode } = require('../helperFunctions/handleParams');

module.exports = (app) => {

	app.get('/api/searchByWard', (req, res) => {

		let ward = req.query.ward;
		let roomType = req.query.roomType;
		let lowPrice = req.query.lowPrice;
		let highPrice = req.query.highPrice;
		let lowerRoom = req.query.lowerRoom;
		let higherRoom = req.query.higherRoom;
		let deposit = req.query.deposit;
		let key = req.query.key;
		let age = req.query.age;
		let distance = req.query.distance;
		let api = req.query.api;

		console.log(ward, roomType, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key, age, distance);


		// var listOfRoomStrings = roomsList(roomType);
		//list of room strings can take first and last a populate with 2ldsk etc

		var apamanRmCode = apamanRoomCode(roomType);
		console.log("this is apamanCode", apamanRmCode);

		var gpRmCode = gpRoomCode(roomType);
		console.log("this is gaijinPotCode", gpRmCode);

		var apamanWardNames = apamanCity(ward);
		console.log("this is apamanCity", apamanWardNames);



		console.log("this is api", api);

		// console.log("this is the list of rooms", listOfRoomStrings);

		//convert roomType into an exhaustive array (ALL IN BETWEEN) of 1LDK, 2LDK etc

		//do conditional calls based on waterfall and async
		//you can still define all the other functions
		













		// var gpParts = createGPLink(gpWardNames, gpRmCode, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key, age, distance)
		// console.log('this is createGPLink', gpParts);

		var gpLinks = [];

		for(var j = 0; j < ward.length; j++){
			var gpParts = createGPLink(ward[j], gpRmCode, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key, age, distance)
			var gpString = '';
			for(var i = 0; i < gpParts.length; i++){
				gpString += gpParts[i];
			}
			gpLinks.push(gpString);
		}

		console.log("this is gpLinks", gpLinks);

		console.log("this is apamanString", apamanString);


		var apamanParts = createApamanLink(apamanWardNames, apamanRmCode, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key, age, distance)
		console.log("this is createApamanLink", apamanParts);

		var apamanString = '';

		for(var i = 0; i < apamanParts.length; i++){
			apamanString += apamanParts[i];
		}

		console.log("this is apamanString", apamanString);





		console.log("this is gpLinks", gpLinks[0]);

		var testGP = 'https://apartments.gaijinpot.com/en/rent/listing?prefecture=JP-13&city=tokyo&min_price=30000&max_price=1000000&rooms=4&distance_station=20&building_type=mansion-apartment&building_age=0';
		var testGP2 = 'https://apartments.gaijinpot.com/en/rent/listing?prefecture=JP-13&city=adachi&rooms=4&min_price=0&max_price=9999999&min_meter=0&building_age=0&distance_station=0&building_type=mansion-apartment';
		var testGP3 = 'https://apartments.gaijinpot.com/en/rent/listing?prefecture=JP-13&city=tokyo&rooms=4&building_type=mansion-apartment&building_age=0';


		//gpLinks is an array of links
		// getGPPageNumber(gpLinks);




		async.each(gpLinks, (link, next) => {
			async.waterfall([
				async.apply(getGPPageNumber, link),
				getGPData,
				next
			]), (err, result) => {
				console.log(result)
			}
		}, (err, result) => {
			if(err) {
				return err;
			}

		});


		// function gpWaterfallSingle() {
		// 	async.waterfall([
		// 		getGPPageNumber,
		// 		getGPData
		// 	], (err, result) => {

		// 		result.sort(function(a, b) {
		// 	    	return a.averagePrice - b.averagePrice;
		// 		});

		// 		console.log(result)
		// 		res.send(result);
				
		// 	});
		// }
		


		//put in gpLinks
		function getGPPageNumber(link, callback){
			console.log("this is the link used", link);
			//use regex to find the ward here

			request(link, (err, res, html) => {
				if(!err){
					$ = cheerio.load(html);

					var searchPageBottom = ($('.paginator'));
					var numberPages;

					searchPageBottom.each(function() {
						numberPages = $(this).find('.pagination-last').find($('a')).attr('href');
					});

					console.log("hello");

					if(numberPages === undefined) {
						numberPages = 1;
					}

					console.log("this is the number of pages", numberPages);


					// create page links
					var gpPages = '';
					var gpPageLinks = [];
					var ward = link.match(/city=(.*)/)[1].replace(/&.*$/,"");;

					console.log("this is ward inside getGPPageNumber", ward);

					//create unique links

					//this is the problem here ward[0]
					var gpParts = createGPLink(ward, gpRmCode, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key, age, distance)

					for(var i = 1; i <= 1; i++){
						var j = 0;
						while(j < gpParts.length){
							if(j === 0){
								gpPages = gpPages + gpParts[j] + `?page=${i}`;
							}

							else if(j !== 0 && j !== gpParts.length - 1) {
								gpPages += gpParts[j];
							}

							j++;
						}

						gpPageLinks.push(gpPages);
						gpPages = '';
					}

					console.log("this is gpPageLinks", gpPageLinks);

					//make async calls
					callback(null, gpPageLinks);
					
				}
			});
		}


		function getGPData(links, callback){
			//createLink
			//do pageData here
			console.log('these are links in getGPData', links);

			var array = [];
			var count = 0;
			var linksLength = links.length;
			//make next a callback
			async.whilst(
				function() { 
					return count < linksLength; 
				},
				function(cb){
					var link = links[count];
					request(link, (err, res, html) => {
						if(!err){
							$ = cheerio.load(html);

							var overallBox = $('.mod_box_section_bdt');

							overallBox.each(function() {
								array.push({
									buildingName: $(this).find($('.name')).text(),
									link: 'http://www.apamanshop.com/' + $(this).find($('.box_head_result')).find($('a')).attr('href'),
									location: $(this).find($('.address')).text(),
									trainStation: formatApamanTrains($(this).find($('.list_info')).find($('li')).text()),
									priceRange: $(this).find($('.info')).find($('.price')).text(),
									averagePrice: averageApaman($(this).find($('.info')).find($('.price')).text()),
									propertiesAvailable: $(this).find($('tbody')).find($('tr')).length-$(this).find($('tbody')).find($('.tr_under')).length-1,
									roomType: $(this).find($('tbody')).find($('.list_icn_room')).parent().next().next().next().children().first().text(),
									roomSize: $(this).find($('tbody')).find($('.list_icn_room')).parent().next().next().next().children().first().next().text(),
									api: 'apaman'
								});
							});

							count++;
							cb();
						}
					});
				}, function(err) {
					if(err) {
						return err;
					}

					else {
						// console.log('this is outside of async.each', array);
						callback(null, array);
				    }
				});
		}











		function apamanWaterfallSingle() {
			async.waterfall([
				getApamanPageNumber,
				getApamanData
			], (err, result) => {

				result.sort(function(a, b) {
			    	return a.averagePrice - b.averagePrice;
				});

				console.log(result)
				res.send(result);
				
			});
		}

		// apamanWaterfallSingle();
		

		function getApamanPageNumber(callback){
			request(apamanString, (err, res, html) => {
				if(!err){
					$ = cheerio.load(html);

					var searchPageBottom = ($('.mod_pager'));

					searchPageBottom.each(function() {
						numberPages = $(this).find('.next').prev().text();
					});

					var numberPages;
					console.log("this is number", numberPages);

					//create page links
					var apamanPages = '';
					var apamanLinks = [];

					//create unique links

					for(var i = 1; i <= 1; i++){
						var j = 0;
						while(j < apamanParts.length){

							if(j === 1){
								apamanPages = apamanPages + apamanParts[j] + `?page=${i}`;
							}

							else if(j !== 1 && j !== apamanParts.length - 1) {
								apamanPages += apamanParts[j];
							}

							j++;
						}

						apamanLinks.push(apamanPages);
						apamanPages = '';
					}

					console.log(apamanLinks);
					//make async calls
					callback(null, apamanLinks);
					
				}
			});
		} 

		function getApamanData(links, callback){
			//createLink
			//do pageData here
			console.log('these are links in getApamanData', links);

			var array = [];
			var count = 0;
			var linksLength = links.length;
			//make next a callback
			async.whilst(
				function() { 
					return count < linksLength; 
				},
				function(cb){
					var link = links[count];
					request(link, (err, res, html) => {
						if(!err){
							$ = cheerio.load(html);

							var overallBox = $('.mod_box_section_bdt');

							overallBox.each(function() {
								array.push({
									buildingName: $(this).find($('.name')).text(),
									link: 'http://www.apamanshop.com/' + $(this).find($('.box_head_result')).find($('a')).attr('href'),
									location: $(this).find($('.address')).text(),
									trainStation: formatApamanTrains($(this).find($('.list_info')).find($('li')).text()),
									priceRange: $(this).find($('.info')).find($('.price')).text(),
									averagePrice: averageApaman($(this).find($('.info')).find($('.price')).text()),
									propertiesAvailable: $(this).find($('tbody')).find($('tr')).length-$(this).find($('tbody')).find($('.tr_under')).length-1,
									roomType: $(this).find($('tbody')).find($('.list_icn_room')).parent().next().next().next().children().first().text(),
									roomSize: $(this).find($('tbody')).find($('.list_icn_room')).parent().next().next().next().children().first().next().text(),
									api: 'apaman'
								});
							});

							count++;
							cb();
						}
					});
				}, function(err) {
					if(err) {
						return err;
					}

					else {
						// console.log('this is outside of async.each', array);
						callback(null, array);
				    }
				});
		}

		function averageApaman(text) {
			var newStr = text.replace("～", ",").replace("万円", "");
			var arr = newStr.split(',');
			var averageValue = 0;
			var tempArr = [];

			for (var i = 0; i < arr.length; i++){
				tempArr.push(Number(arr[i]));
			}

			averageValue = (tempArr[0]+tempArr[1])/tempArr.length;

			if(countDecimals(averageValue) > 1){
				return Number(averageValue.toFixed(2));
			}

			else{
				return Number(averageValue);
			}
		}

		function countDecimals (value) {
		    if(Math.floor(value) === value) return 0;
		    return value.toString().split(".")[1].length || 0; 
		}

		function formatApamanTrains (value) {
			var re = /(分)/g;
			var str = value
			var subst = '分,'
			var result = str.replace(re, subst);
			var newText = result.split(',');
			newText.pop();
			return newText;
		}

	});

}
