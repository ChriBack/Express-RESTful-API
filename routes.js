var express = require('express');
var userCtrl = require('./users');
var dynPricesCtrl = require('./dynamic-prices');

var router = express.Router();

//http://127.0.0.1:8081/user
router.route('/user').get(userCtrl.getUsers);

////http://127.0.0.1:8081/user
// {
//     "user":
//         {
//             "name" : "mohit",
//             "password" : "password4",
//             "profession" : "teacher",
//             "id": 4
//         }
// }
router.route('/user').post(userCtrl.postUser);

//http://127.0.0.1:8081/user/21c15be0-4f44-11e7-b732-2dfc682b6967
router.route('/user/:id').get(userCtrl.getUser);

//http://127.0.0.1:8081/user/21c15be0-4f44-11e7-b732-2dfc682b6967
router.route('/user/:id').delete(userCtrl.deleteUser);
//____________________________________________________________________________________

//http://127.0.0.1:8081/DynPrices
router.route('/DynPrices').get(dynPricesCtrl.getDynPrices);

//http://127.0.0.1:8081/DynPrices
// {
//     "dynPrice":
//         {
//             "Rule": 8,
//             "SellerId": 1,
//             "Name": "CCCCC",
//             "BaseReference": 1,
//             "State": 16,
//             "Reference": "Händlerpreis",
//             "Percent": 10,
//             "AbsoluteValue": -1,
//             "2ebayListerLinkedArticles": 6,
//             "amazonListerLinkedArticles": 3,
//             "runningEbayItems": 2
//         }
// }
router.route('/DynPrices').post(dynPricesCtrl.postDynPrice);

//http://127.0.0.1:8081/DynPrice/a82c5c90-501e-11e7-84f2-f1c53e5d94d8
router.route('/DynPrice/:id').get(dynPricesCtrl.getDynPrice);

//http://127.0.0.1:8081/DynPrice/a82ef4a0-501e-11e7-84f2-f1c53e5d94d8
router.route('/DynPrice/:id').delete(dynPricesCtrl.deleteDynPrice);

//http://127.0.0.1:8081/DynPrice/a82c5c90-501e-11e7-84f2-f1c53e5d94d8
router.route('/DynPriceFiltered/').post(dynPricesCtrl.getDynPricesFiltered);


module.exports = router;