var fs = require("fs");
var contents = fs.readFileSync("./dynaimc-prices.json");
var jsonContent = JSON.parse(contents);
var uuid = require('uuid');
var bodyParser = require('body-parser');
var _ = require('underscore');

module.exports = {
	getDynPrices: function (req, res) {
		console.log(jsonContent);
		res.send(jsonContent);
		res.end();
	},
	getDynPrice: function (req, res) {
		DynPrices = jsonContent;
		var result = DynPrices.filter(function (obj) {
			return obj.Id == req.params.id;
		});
		if (result.length != 0) {
			console.log(result);
			res.end(JSON.stringify(result));
		}
		else {
			res.status(400);
			res.send('None shall pass');
		}
	},
	postDynPrice: function (req, res) {
		console.log()
		var newDynPrice = req.body.dynPrice;
		newDynPrice.id = uuid.v1();
		jsonContent.push(newDynPrice);
		res.send(jsonContent);
		res.end();
	},
	deleteDynPrice: function (req, res) {
		DynPrices = jsonContent;
		var found = false;
		for (var i = 0; i < DynPrices.length; i++) {
			console.log(DynPrices[i].Id + ' ' + req.params.id);
			if (DynPrices[i].Id == req.params.id) {
				DynPrices.splice(i, 1);
				found = true;
				break;
			}
		}
		if (found) {
			console.log(DynPrices);
			res.send(DynPrices);
			res.end();
		}
		else {
			res.status(400);
			res.send('No dynamic price rule with id "' + req.params.id + '" available');
		}
	},
	getDynPricesFiltered: function (req, res) {				
		DynPrices = jsonContent;	

		if(req.body.searchInUseSelected != 0){			
			console.log('\x1b[36m%s\x1b[0m', "searchInUseSelected other than 0");
			console.log(req.body.searchInUse[req.body.searchInUseSelected-1]);
			DynPrices = _.filter(DynPrices, function(num){ return num.ebayListerLinkedArticles > 0 && num.amazonListerLinkedArticles > 0 });
		}

		if(req.body.searchReferenceSelected != 0){		
			console.log('\x1b[36m%s\x1b[0m', "searchReferenceSelected other than 0");
			console.log(req.body.searchReference[req.body.searchReferenceSelected-1]);
			DynPrices = _.where(DynPrices,{Reference:req.body.searchReference[req.body.searchReferenceSelected-1].name});
		}	

		console.log(DynPrices.length);
		res.send(DynPrices);
		res.end();
	}
}