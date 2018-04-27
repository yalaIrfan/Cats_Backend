'use strict';
//var http = require('http');
var express = require('express');
var rxjs = require('rxjs/Rx');
var bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const bucketRoutes = require('./routes/bucketRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const collectionFetch = require('./routes/collectionFetch.js');
const userManagerRoutes = require('./routes/userManager.js');
const userFoodList = require('./routes/userFoodList.js');
const quickRoutes = require('./routes/quickRoutes.js');
const theService = require('./services/getService.js');
const testingRoutes = require('./routes/testingRoutes.js');

theService.addData(1,2,3);
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(cors());
var MongoClient = require('mongodb').MongoClient;
var session = require('express-session');
app.use(session({secret:'XASDASDA'}));



app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/', routes);
app.use('/', loginRoutes);
app.use('/', bucketRoutes);
app.use('/', orderRoutes);
app.use('/', userManagerRoutes);
app.use('/', userFoodList);
app.use('/', collectionFetch);
app.use('/', quickRoutes);
app.use('/', test);

var fs = require('fs');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var port = process.env.PORT || 1337;
var url = "mongodb://10.10.3.108:27017";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  console.log("Creating the collection foodList");
  dbo.createCollection("foodList2", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  console.log("Creating the collection foodList");
  dbo.createCollection("bucketCollection", function(err, res) {
    if (err) throw err;
    console.log("bucketCollection created!");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  console.log("Creating the collection foodList");
  dbo.createCollection("userList", function(err, res) {
    if (err) throw err;
    console.log("Collection userList created!");
    db.close();
  });
});


var server = app.listen(port, function () {
    console.log('Node server is running on port..' + port);
});
app.get('/about', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

var data = { "fruits" : [
    {
      "name" : "Apple",
      "price" : 35
    },
    {
      "name" : "Banana",
      "price" : 12
    },
    {
      "name" : "Grapes",
      "weight": 0.1,
      "price" : 45
    },
    {
      "name" : "Pineapple",
      "price" : 200
    }
  ]
};
     return res.json(data);

});
app.post("/about", function (req, res) {
	const fs = require('fs');
 var title = req.body.title;
  var body = req.body.body;
let lyrics = title + " : " + body;

fs.writeFile('1.txt', lyrics, (err) => {

    if (err) throw err;


    console.log('Lyric saved!');
});

 console.log(req.body.title);
 var data = {
       'status':'ok'
      };
 if(req.body.title!="183")
		data.status="false";

     return res.json(data);

});

app.route('/noticeBoard/:id?')
  .get(function (req, res) {

     var x = noticeBoard.get(req.params.id);
     console.log("x i s::::::::" ,x);
    //  res.setHeader('Content-Type', 'application/json');
    //  res.send(x);
  })
  .post(function (req, res) {
    noticeBoard.post(req);
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
