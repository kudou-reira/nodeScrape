const requireLogin = require('../middlewares/requireLogin');
const cheerio = require('cheerio');
const request = require('request');
const rp = require('request-promise');
const async = require('async');
const _ = require('lodash');
const { createGPLink, allGPLinks, allApamanLinks, gpRoomCode, createApamanLink, apamanCity, apamanRoomCode } = require('../helperFunctions/handleParams');
const { getGPPageNumber, getGPData } = require('../helperFunctions/gpApi');
const { getApamanPageNumber, getApamanData } = require('../helperFunctions/apamanApi');

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
		var gpRmCode = gpRoomCode(roomType);
		var apamanWardNames = apamanCity(ward);


		//create gpLinks
		var gpLinks = allGPLinks(ward, gpRmCode, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key, age, distance);

		//create apamanLinks
		var apamanParts = createApamanLink(apamanWardNames, apamanRmCode, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key, age, distance)

		var apamanString = allApamanLinks(apamanParts);


		//main
		//declare functions as variables to be passed into async parallel
		//push them onto the stack
		//rawData is for gp ONLY
		let rawData = [];
		var count = 0;
		var gpLinksCount = gpLinks.length;

		var gpOverall = function gpScrape(callback) {
			async.each(gpLinks, (link, callback) => {
				async.waterfall([
					async.apply(getGPPageNumber, link, ward, gpRmCode, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key, age, distance),
					getGPData
				], (err, result) => {

					console.log('processed ');
					gpLinksCount--;
					// console.log('count', gpLinksCount);
					rawData = rawData.concat(result);
					// console.log("this is waterfall gaijinpot", rawData);

					// when count is 0, do the callback
					if(gpLinksCount === 0) {
						console.log("calling callback");
						callback(rawData);
					}
					
				})
			}, (result) => {
				console.log('this is the result', result);
				callback(null, result);
			});
		}


		var apamanOverall = function apamanScrape(callback) {
			async.waterfall([
				async.apply(getApamanPageNumber, apamanString, apamanParts),
				getApamanData
			], (err, result) => {
				callback(null, result)
			});
		}

		//push functions needed onto stack
		var apiStack = [];

		var apiAssign = {
			apaman: apamanOverall,
			gaijinpot: gpOverall
		};

		for(var i = 0; i < api.length; i++){
			apiStack.push(apiAssign[api[i]]);
		}

		console.log("this is api stack", apiStack);

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

	});

}
