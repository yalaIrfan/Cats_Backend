const collectionFetch = require('express').Router();
var rxjs = require('rxjs/Rx');
var url = "mongodb://10.10.3.108:27017";
var Promise = require("bluebird");
var MongoClient = require('mongodb').MongoClient;



collectionFetch.get('/collectionFetch:info', function (req, res) {
console.log("Get  /collectionFetch Request recieved");
console.log('req.params og Get request of collectionFetch',req.params)
console.log('----------------------------------------------------->>>>>>>>>',req.params)
  var x = JSON.parse(req.params.info);
getData(x.collection,x.id).then(function (data) {
console.log('result after resolve',data);
return res.json(data);
}).catch(function (data) {
return res.json(data);
});


});

module.exports = collectionFetch;
