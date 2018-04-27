const userFoodList = require('express').Router();
var rxjs = require('rxjs/Rx');
var url = "mongodb://10.10.3.108:27017";
var Promise = require("bluebird");
var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var bodyParser = require('body-parser');

exports.addData = (collectionName,key,keyValue) =>
{
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
