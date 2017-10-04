const cheerio = require('cheerio');
const request = require('request');
const rp = require('request-promise');
const async = require('async');
const { createGPLink, countDecimals } = require('./handleParams');



const getGPPageNumber = (link, ward, gpRmCode, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key, age, distance, callback) => {
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

			for(var i = 1; i <= numberPages; i++){
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

getGPData = (links, callback) => {
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

const formatGPPrice = (number) => {
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

formatGPYen = (number) => {
	var temp = number.toString();
	temp = temp + '万円';
	return temp;
}

formatGPRoomType = (room) => {
	var newText = room;
	newText = newText.replace(/\t+/g, "").replace(/\s/g,'').replace("\n"," ").replace('Apartment', '');
	return newText;
}

formatGPTrainStation = (train) => {
	var newText = train;
	newText = newText.replace('Nearest Station', '');
	newText = newText.replace(/Station/g, "Station ")
	return newText;
}

formatGPLocation = (place) => {
	var newText = place;
	newText = newText.replace('in ', '').replace('<br>', ' ');
	return newText;
}

formatGPRoomSize = (room) => {
	var newText = room;
	newText = newText.replace(/\t+/g, "").replace("\n"," ").replace('Size ', '').replace(' ', '');
	return newText;
}

formatGPBuildingName = (building) => {
	var newText = building;
	newText = newText.replace(/\t+/g, "").replace("\n","").replace("\n","");
	return newText;
}


module.exports = {
	getGPData,
	getGPPageNumber
}