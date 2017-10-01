const requireLogin = require('../middlewares/requireLogin');
const cheerio = require('cheerio');
const request = require('request');
const rp = require('request-promise');
const async = require('async');
const _ = require('lodash');
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




		//main
		//declare functions as variables to be passed into async parallel
		let rawData = [];
		var count = 0;
		var gpLinksCount = gpLinks.length;

		var gpOverall = function gpScrape(callback) {
			async.each(gpLinks, (link, callback) => {
				async.waterfall([
					async.apply(getGPPageNumber, link),
					getGPData
				], (err, result) => {

					console.log('processed ');
					gpLinksCount--;
					// console.log('count', gpLinksCount);
					rawData.push(result);
					// console.log("this is waterfall gaijinpot", rawData);
					var temp = rawData;

					// when count is 0, do the callback
					if(gpLinksCount === 0) {
						console.log("calling callback");
						callback(rawData);
					}
					
				})
			}, (result) => {

				console.log('all links processed :D');
				console.log('all links processed :D');
				console.log('all links processed :D');

				var temp = _.flatten(result);
				console.log('this is the result', temp);
				callback(null, temp);
			});
		}


		var apamanOverall = function apamanScrape(callback) {
			async.waterfall([
				getApamanPageNumber,
				getApamanData
			], (err, result) => {
				callback(null, result)
			});
		}



		var apiStack = [];

		var apiAssign = {
			apaman: apamanOverall,
			gaijinpot: gpOverall
		};


		for(var i = 0; i < api.length; i++){
			apiStack.push(apiAssign[api[i]]);
		}

		console.log("this is apaman stack", apiStack);

		combineApi((err, result) => {
			var temp = _.flatten(result);
			temp.sort(function(a, b) {
		    	return a.averagePrice - b.averagePrice;
			});
			console.log('this is combineApi', temp);

			res.send(temp);
		});



		function combineApi(callback) {
			async.parallel(apiStack, (err, result) => {
				callback(err, result);
			});
		}


		// function combineApi(stack, callback) {
		// 	async.parallel([
		// 		gpScrape,
		// 		apamanScrape
		// 	], (err, result) => {
		// 		console.log('this is from inside combine API', result);
		// 		callback(err, result);
		// 	});
		// }








		// gpScrape((null, result) => {
		// 	console.log('this is from gpScrape callback', result);
		// });



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
					var ward = link.match(/city=(.*)/)[1].replace(/&.*$/, "");

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

							var overallBox = $('.listing-body');

							overallBox.each(function() {
								var findBuildingLink = $(this).find($('.listing-title')).find($('a')).attr('href');
								var buildingLink = `https://apartments.gaijinpot.com${findBuildingLink}`;

								// console.log("this is secondLinkToScrape", buildingLink);
								var apartmentObject = {};

								var apartmentObject = {
									buildingName: formatGPBuildingName($(this).find($('.text-xsmall')).first().text()),
									link: buildingLink,
									location: formatGPLocation($(this).find($('.listing-title')).children().last().html()),
									trainStation: [formatGPTrainStation($(this).find($('.listing-right-col')).children().last().children().text())],
									priceRange: formatGPYen(formatGPPrice($(this).find($('.listing-title')).next().text())),
									averagePrice: formatGPPrice($(this).find($('.listing-title')).next().text()),
									propertiesAvailable: 1,
									roomType: formatGPRoomType($(this).find($('.listing-title')).children().children().text()),
									roomSize: formatGPRoomSize($(this).find($('.listing-title')).next().next().text()),
									api: 'gaijinpot'
								}

								//give up on this feature for now

								// buildingName: $(this).find($('.name')).text(),

								// var options = {
								// 	uri: buildingLink,
								// 	transform: (html) => {
								// 		return cheerio.load(html);
								// 	}
								// };

								// rp(options)
								// 	.then(($) => {
								// 		var overallBox = $('.dl-horizontal-border');

								// 		var buildingName = '';

								// 		console.log('test', $(this).find('dd').text());

								// 		// overallBox.each((i, element) => {
								// 		// 	$(element).contents().each((i, element) => {
								// 		// 		if(element.type === 'text'){
								// 		// 			console.log($(element));
								// 		// 		}
								// 		// 	});
								// 		// });

								// 		// console.log("this is building name", buildingName);

								// 	})
								// 	.catch((err) => {
								// 		console.log('cheerio crawling failed', err);
								// 	});



								array.push(apartmentObject);


								//do the second request here
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
						// console.log('this is outside/after of async.each', array)
				    }
				});
		}


		function formatGPPrice(number) {
			var newText = number;
			newText = newText.replace(/\t+/g, "").replace(/\s/g,'').replace('MonthlyCosts', '').replace("\n"," ").replace('¥', '').replace(',', '');
			var newNumber = Number(newText)/10000;
			var decimalPoints = countDecimals(newNumber);

			if(decimalPoints > 1){
				return newNumber.toFixed(2);
			}

			else{
				return newNumber;
			}
		}

		function formatGPYen(number){
			var temp = number.toString();
			temp = temp + '万円';
			return temp;
		}

		function formatGPRoomType(room) {
			var newText = room;
			newText = newText.replace(/\t+/g, "").replace(/\s/g,'').replace("\n"," ").replace('Apartment', '');
			return newText;
		}

		function formatGPTrainStation(train) {
			var newText = train;
			newText = newText.replace('Nearest Station', '');
			newText = newText.replace(/Station/g, "Station ")
			return newText;
		}

		function formatGPLocation(place) {
			var newText = place;
			newText = newText.replace('in ', '').replace('<br>', ' ');
			return newText;
		}

		function formatGPRoomSize(room) {
			var newText = room;
			newText = newText.replace(/\t+/g, "").replace("\n"," ").replace('Size ', '').replace(' ', '');
			return newText;
		}

		function formatGPBuildingName(building){
			var newText = building;
			newText = newText.replace(/\t+/g, "").replace("\n","").replace("\n","");
			return newText;
		}




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
