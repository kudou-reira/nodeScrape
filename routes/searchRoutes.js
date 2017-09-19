const requireLogin = require('../middlewares/requireLogin');
const cheerio = require('cheerio');
const request = require('request');
const async = require('async');
const {createApamanLink} = require('../helperFunctions/handleParams');

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

		console.log(ward, roomType, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key, age, distance);


		var apamanParts = createApamanLink(ward, roomType, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key, age, distance)
		console.log("this is createLink", apamanParts);

		var apamanString = '';

		for(var i = 0; i < apamanParts.length; i++){
			apamanString += apamanParts[i];
		}

		console.log("this is apamanString", apamanString);

		request(apamanString, (err, res, html) => {
			if(!err){
				$ = cheerio.load(html);

				var numberOfPages = ($('.mod_pager'));
				var number;

				numberOfPages.each(function() {
					number = $(this).find('.next').prev().text();
				});

				console.log("this is number", number);
			}
		});


		// var apaman = 'http://www.apamanshop.com/tokyo/';
		// var apamanTest = 'http://www.apamanshop.com/tokyo/104/?madori=10-11-12-14-21-22&tinryo1=20000&tinryo2=100000&senyu1=15&senyu2=30&nensu=1&toho=7&chintai_plan=chintai';
		// var apaman = 'http://www.apamanshop.com/tokyo/';
		// var apamanTest = 'http://www.apamanshop.com/tokyo/104/?madori=10-11-12-14-21-22&tinryo1=20000&tinryo2=100000&senyu1=15&senyu2=30&nensu=1&toho=7&chintai_plan=chintai';
		
		// var apamanTest3= 'http://www.apamanshop.com/tokyo/104-115-119-110-113/?page=1&tinryo2=9999999&senyu1=1&senyu2=99999'

		//createLink
		//do pages here

		// request(apamanTest2, (err, res, html) => {
		// 	if(!err){
		// 		$ = cheerio.load(html);
		// 		var array = [];

		// 		var overallBox = $('.mod_box_section_bdt');
				
		// 		var numberOfPages = ($('.mod_pager'));
		// 		var number;

		// 		numberOfPages.each(function() {
		// 			number = $(this).find('.next').prev().text();
		// 		});

		// 		console.log("this is number", number);
				
		// 		// console.log(res.body);

		// 		// overallBox.each(function() {
		// 		// 	array.push({
		// 		// 		buildingName: $(this).find($('.name')).text(),
		// 		// 		link: 'http://www.apamanshop.com/' + $(this).find($('.box_head_result')).find($('a')).attr('href'),
		// 		// 		location: $(this).find($('.address')).text(),
		// 		// 		trainStation: $(this).find($('.list_info')).find($('li')).text(),
		// 		// 		priceRange: $(this).find($('.info')).find($('.price')).text(),
		// 		// 		propertiesAvailable: $(this).find($('tbody')).find($('tr')).length-$(this).find($('tbody')).find($('.tr_under')).length-1
		// 		// 	});
		// 		// });

		// 		// console.log(array);
		// 	}
		// })




		res.send(ward);
	});

	app.get('/api/save', requireLogin, async (req, res) => {

		console.log(req.user);

		// const charge = await;
		// req.user.credits += 5;
		// const user = await req.user.save();

		// res.send(user);

		// db.update ({'seraching criteria goes here ' },
		// {
		//  $set : {
		//           trk : [ {
		//                      "lat": 50.3293714,
		//                      "lng": 6.9389939
		//                   },
		//                   {
		//                      "lat": 50.3293284,
		//                      "lng": 6.9389634
		//                   }
		//                ]//'inserted Array containing the list of object'
		//       }
		// });
	});

	// console.log(req.body)
	// app.post('/api/stripe', (req, res) => {

	// });

}
