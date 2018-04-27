var orderRoutes = require('./routes');
const routes = require('express').Router();
routes.get('/', function (req, res) {
console.log("Get Request recieved");
    res.sendFile('index.html', { "root": __dirname });
});

routes.post("/about", function (req, res) {
    console.log("Post Request recieved from aboout");
 var id = req.body.id;
  var password = req.body.password;
 console.log(req.body.id);
  console.log(req.body.password);
 var data = {
       'status':'ok',
       'access':'true'
      };
     return res.json(data);

});

routes.get('/about', function (req, res) {
  console.log("Get Request recieved from aboout");
	var fs = require('fs');
var data = { "fruits" : [
    {
      "name" : "Apple",
      "price" : 35
    }
  ]
};     return res.json(data);
});



module.exports = routes;
