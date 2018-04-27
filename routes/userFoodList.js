const userFoodList = require('express').Router();
var rxjs = require('rxjs/Rx');
var url = "mongodb://10.10.3.108:27017";
var Promise = require("bluebird");
var MongoClient = require('mongodb').MongoClient;

userFoodList.post('/userFoodList', function (req, res) {
  console.log('post of userFoodList ');
    console.log(req.body.bucket);
    addDate(req.body.bucket,req.body.id,req.body.name,req.body).then(function(data) {
return res.json({'code':'201','msg':'Data saved succesfully :'})
    }).catch(function(data) {
return res.json({'code':'400','msg':'Error'})
    });

});
function addDate(bucket,id,name,data)  {
  return new  Promise(function(resolve,reject){
    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("test");
        let dataToStore = {'id':id,'user':name,'data':data};
        console.log('data to store:',dataToStore);
    dbo.collection(bucket).insertOne(dataToStore, function(err, res) {
             if (err) {throw err; reject('Some error');}
             console.log("Record saved into the !",bucket);
             resolve('User added');
             db.close();
         });
      });
});
}
module.exports = userFoodList;
