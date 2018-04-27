const quickRoutes = require('express').Router();
var rxjs = require('rxjs/Rx');
var url = "mongodb://10.10.3.108:27017";
var Promise = require("bluebird");
var MongoClient = require('mongodb').MongoClient;



quickRoutes.post('/quick', function (req, res) {
console.log("Post /bucket Request recieved");
console.log('body quick :',req.body);
console.log('body quick 0 :',req.body[0]);
    var userName = req.body[2];
    var food = req.body[0];
      var q = req.body[1];
storeTheData(userName,food,q).then(function(data) {
  console.log()
  // var data = {
  //       'code':'201',
  //       'msg':'Data stored'
  //      };

  var data= getNewList().then(function(data2) {
    console.log('data 2',data2);
    return res.json(data2);
  });


   });


});

let storeTheData = (userName,food,q) =>
{
  var today = new Date();
 var formattedtoday = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
let dataToStore = {'user':userName,'food':food,'q':q,'date':formattedtoday,'bucket':'open'};

  return new Promise(function(resolve,reject) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    console.log("add data to open");
    dbo.collection("foodList2").insertOne(dataToStore, function(err, res) {
               if (err) {throw err; reject('Some error');}
               console.log("Record saved into the bucketCollection !");

               resolve('User added');
               db.close();
           });
  });
});
}

var getNewList = function (){
  console.log('niche hu mai');
  return new Promise(function(resolve,reject) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("test");
        let query = { bucket: 'open' };
      dbo.collection('foodList2', function (err, collection) {
           collection.find(query).toArray(function (err, items) {
                 if(items!==null  && (items[0] !==null || items[0]!==undefined) ){

                   console.log(items.length);
                 resolve(items);
               }
                 else
                   resolve('404');
               db.close();
           });
       });
    });
  });
}












quickRoutes.get('/quick', function (req, res) {
console.log("Get  /quick Request recieved");

getData('foodList2','open').then(function (data) {
console.log('result after resolve',data);
return res.json(data);
}).catch(function (data) {
return res.json(data);
});


});

function getData(collectionName,theId)
{
  console.log('Collection name:',collectionName)
console.log("gg down",collectionName,theId);
  return new Promise(function(resolve,reject) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      //  let query = { address: "Park Lane 38" };
      dbo.collection(collectionName, function (err, collection) {
           collection.find({'bucket':theId.toString()}).toArray(function (err, items) {
                 if(items!==null  && (items[0] !==null || items[0]!==undefined) )
                 resolve(items);
                 else
                   resolve('404');
               db.close();
           });
       });
    });
  });
}

module.exports = quickRoutes;
