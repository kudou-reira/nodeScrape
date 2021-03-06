const cheerio = require('cheerio');
const request = require('request');
const async = require('async');
const { countDecimals } = require('./handleParams');

const getApamanPageNumber = (apamanString, apamanParts, callback) => {
	request(apamanString, (err, res, html) => {
		if(!err){
			$ = cheerio.load(html);

			var searchPageBottom = ($('.mod_pager'));
			var numberPages;

			searchPageBottom.each(function() {
				numberPages = $(this).find('.next').prev().text();
			});

			
			console.log("this is number", numberPages);

			//create page links
			var apamanPages = '';
			var apamanLinks = [];

			//create unique links
			for(var i = 1; i <= numberPages; i++){
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

const getApamanData = (links, callback) => {
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

const averageApaman = (text) => {
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

const formatApamanTrains = (value) => {
	var re = /(分)/g;
	var str = value
	var subst = '分,'
	var result = str.replace(re, subst);
	var newText = result.split(',');
	newText.pop();
	return newText;
} 


module.exports = {
	getApamanPageNumber,
	getApamanData
}