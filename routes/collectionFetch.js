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

function getData(collectionName,key,keyValue)
{
  console.log('Collection name:',collectionName)
console.log("gg down",collectionName);
  return new Promise(function(resolve,reject) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      //  let query = { address: "Park Lane 38" };
      dbo.collection(collectionName, function (err, collection) {
           collection.find({key:keyValue}).toArray(function (err, items) {
                 if(items!==null  && (items[0] !==null || items[0]!==undefined) ){
                   console.log('AAAAAAAA ',items.map(function(element){
                      console.log(element);
                   }));
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

var aaaa=function (){
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ');
  var item ={'name':'oooooo'};
  return item;
}

module.exports = collectionFetch;
