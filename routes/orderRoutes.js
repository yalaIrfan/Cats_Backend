const orderRoutes = require('express').Router();
var rxjs = require('rxjs/Rx');
var url = "mongodb://10.10.3.108:27017";
var Promise = require("bluebird");
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var MongoClient = require('mongodb').MongoClient;

var theResponse = undefined;
  var foodListArray=[];
  var mongo = require('mongodb-bluebird');

orderRoutes.post('/order', function (req, res) {
  var dataToStore  =req.body;
console.log(typeof dataToStore);
  MongoClient.connect(url, function(err, db) {
    console.log("Connected successfully to server");
    var dbo = db.db("test");

    dbo.collection("foodList2").insertOne(dataToStore, function(err, res) {
         if (err) throw err;
         console.log("Document inserted");
         db.close();
     });
  });

res.json({ code: '201' });
  });




orderRoutes.get('/order', function (req, res) {
console.log("Get /bucket Request recieved");

let theResponse =  new Promise((resolve, reject) => {
       MongoClient.connect(url, function(err, db) {
         console.log("Connected successfully to server");
        var dbo = db.db("test");
         dbo.collection("foodList2").findOne({},{ sort: { _id: -1 }, limit: 1 },function(err, result) {
        if (err) throw err;

         console.log(result);
resolve(result);
             db.close();
        });
       });

});
theResponse.then(function(data)
{
  console.log("theResponse's data ",data);
  res.send(data);
  res.end();
});

// let theResponse =  new Promise((resolve, reject) => {
//        MongoClient.connect(url, function(err, db) {
//          console.log("Connected successfully to server");
//         var dbo = db.db("test");
//          dbo.collection("foodList").findOne({}, function(err, result) {
//         if (err) throw err;
//
//          console.log(result);
// resolve(result);
//              db.close();
//         });
//        });
//
// });
// theResponse.then(function(data)
// {
//   console.log("theResponse's data ",data);
//   res.send(data);
//   res.end();
// });
});

module.exports = orderRoutes;
