const userManagerRoutes = require('express').Router();
var rxjs = require('rxjs/Rx');
var url = "mongodb://10.10.3.108:27017";
var Promise = require("bluebird");
var MongoClient = require('mongodb').MongoClient;


userManagerRoutes.post('/userManager', function (req, res) {
var dataToStore = req.body
MongoClient.connect(url, function(err, db) {
var dbo = db.db("test");
dbo.collection("userList").findOne({id: req.body.id}, function(err, user){
         if(err) {
           console.log(err);
         }
         if(user) {
           console.log('user 1:',user);
           res.json({ code: '406',message:'User already exsist' });
         } else {
            console.log('user 2:',user);
           addNewUser(req.body).then(function(data){
           res.json({ code: '201',message:'Success' });
           }).catch(function(data){res.json({ code: '503',message:'Error' });});
         }
     });
});
});


userManagerRoutes.get('/userManager:id', function (req, res) {
  var sessData = req.session;
  sessData.type = 'login';
   console.log("session:", sessData.type);
    console.log('The get request from userManager body: ',  req.params);
    var x = JSON.parse(req.params.id);

console.log('X.id:',x.id);

checkUser(x.id).then(function(data) {
  if(data!==null)
  {
    data['code']='200';
    sessData.id = data.id;
console.log("session 2:", sessData.id);
    res.json(data);
  }
else
  res.json({'code':'404','message':'User not exsist'});
}).catch(function(data){
  res.json(data);})
});

function checkUser(theId)
{
return new Promise(function(resolve,reject){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("userList").findOne({'id':theId.toString()}, function(err, result) {
    if (err) {reject('Error');throw err};

    resolve(result);
    db.close();
  });
});
});
}

function addNewUser(dataToStore)
{
  return new  Promise(function(resolve,reject){
    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("test");
    dbo.collection("userList").insertOne(dataToStore, function(err, res) {
             if (err) {throw err; reject('Some error');}
             console.log("A new user added !");
             resolve('User added');
             db.close();
         });
      });
});
}
module.exports = userManagerRoutes;
