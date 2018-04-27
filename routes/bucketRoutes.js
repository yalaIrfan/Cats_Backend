const bucketRoutes = require('express').Router();
var rxjs = require('rxjs/Rx');
var url = "mongodb://10.10.3.108:27017";
var Promise = require("bluebird");
var MongoClient = require('mongodb').MongoClient;


bucketRoutes.post('/bucket', function (req, res) {
console.log("Post /bucket Request recieved");
var d = new Date();
var theDate = d.getDate()+ '_' + (d.getMonth()+1);
    var userName = req.body.name;
    var userId = req.body.id;
    var collectionName = req.body.name + '_' + theDate +'_'+ userId;
    var note = req.body.note;

checkDuplicate(collectionName,false).then(function(data) {
  console.log('response from the checkDuplicate:',data);
if(data)
{
  console.log('collection already exsist');
  return res.json({code:'403',msg:'Collection already exsist'});
} // end of if else //
else {
    console.log('collection not exsist');

    createCollection(collectionName).then(function (data) {

    console.log('resolve', typeof data);
    addRecord(collectionName,userName,userId,note).then(function(data) {
      console.log('Collection record created');
    }).catch(function(data) {
      console.log('Collection record not created');
    });
    //return res.json(data);
    }).catch(function (data) {
    console.log(data);
    });
      return res.json({code:'403',msg:'Collection will be craeted'});
} // end of the else //

// }).catch(function(data) {
//   console('Some error while creating the record of bucket in bucket collection');
//   return res.json({msg:'Some error while creating the record of bucket in bucket collection'});
// }
 // end of catch //



var data = {
      'status':'ok',
      'access':'true'
     };
   //return res.json(collectionName);

});
});

bucketRoutes.get('/bucket', function (req, res) {
console.log("Get /bucket Request recieved");
getCollectionNames().then(function(data){
console.log("resolve of getCollectionNames",data);
if(data!==null || data!==undefined)
{
  return res.json(data);
// getDataFromCollections(data).then(function(data) {
//     console.log('Resolved data from getDataFromCollections -->>',data);
//     if(data!==null)
//     return res.json(data);
// });
}
});
//var d = new Date(day);
var data = {
      'status':'ok',
      'access':'true'
     };
    //return res.json(xx);

});
function createCollection(collectionName)
{

  return new Promise(function(resolve,reject) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      console.log("Creating the collection foodList");
      dbo.createCollection(collectionName, function(err, res) {
        if (err){reject('error'); throw err;}
        resolve('Collection created');
        db.close();
      });
    });
  });
}

function  addRecord(name,user,id,note) {
  return new  Promise(function(resolve,reject){
    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("test");
        let dataToStore = {'name':name,'user':user,'id':id,'date':new Date(),'note':note};
        console.log('data to store:',dataToStore);
    dbo.collection("bucketCollection").insertOne(dataToStore, function(err, res) {
             if (err) {throw err; reject('Some error');}
             console.log("Record saved into the bucketCollection !");
             resolve('User added');
             db.close();
         });
      });
});
}

function  checkDuplicate(collectionName,ifWantData) {
  //  console.log('inside checkDuplicate:',collectionName);
  return new Promise(function(resolve,reject){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("bucketCollection").findOne({'name':collectionName.toString()}, function(err, result) {
      if (err) {reject('Error');throw err};
  //  console.log('checkDuplicate resolve:',result);
      if(result===null || result ===undefined)
      resolve(false);
      else
      {
            if(ifWantData)
              resolve(result);
            else
              resolve(true);
      }
      db.close();
    });
  });
  });
}

function  getCollectionNames() {
  var arr = new Array();
  //  console.log('inside getCollectionNames inside bucketCollection:');
  return new Promise(function(resolve,reject){
    MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  dbo.collection("bucketCollection").find({}, {_id: 0}).toArray(function(err, result) {
    if (err) throw err;
    console.log('All data in bucketRecord:',result);
      for (var key in result) {
arr.push(result[key]);
//console.log("resolve(arr);",arr);
resolve(arr);
}
  db.close();
  });
});
});
}

function getDataFromCollections(names)
{
  var arr = new Array();

  console.log('names that had: getDataFromCollections',names)
//    console.log('---------------------------------------')
return new Promise(function(resolve,reject){
      for(var i=0;i<names.length;i++)
  {

        checkDuplicate(names[i],true).then(function (data) {

          arr[i]  = data
          console.log('This is the data' +i+" "+ arr[i].name);

          // if(i==names.length-1)
          // {
          //   console.log('going to resolve');
          //   resolve(arr);
          // }

        });
        // console.log('value of the i',i);
        // console.log('length',names.length-1);
}
7
 });

}

module.exports = bucketRoutes;
