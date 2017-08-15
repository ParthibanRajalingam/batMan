var saltAndHash = require('./saltAndHash');
var mongoConnect = require('./mongoConnection');
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



var mongoUrl='mongodb://localhost:27017/trackMyDevice';

app.get('/devices', function (req, res) {
   /*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end( data );
   });*/
console.log('getting devices---'+req.query.email);

	var queryParam={"email":req.query.email};
	console.log(queryParam);
	res.setHeader('Access-Control-Allow-Origin', '*');
	 res.setHeader('Content-Type', 'application/json');
	  mongoConnect.findAll(mongoUrl,'devices',queryParam,function(result){
	  	if(result != null){
	  		console.log('SENDING RESSS'+result);
	  	res.send(JSON.stringify(result));
	  }
	  else{
	  	res.send(JSON.stringify({ "email" : "false" }));	
	  }
  	
  });

})

app.post('/login',function(req,res,err){
	console.log('LOGGING IN----'+req.body);

	var queryParam={"email":req.body.email};
	console.log(queryParam);
	var inPassword=req.body.pwd;
	console.log(inPassword);
	res.setHeader('Access-Control-Allow-Origin', '*');
	 res.setHeader('Content-Type', 'application/json');
	  mongoConnect.find(mongoUrl,'user_details',queryParam,function(result){
	  	if(result != null){
	  	var inPwd = saltAndHash.sha512(inPassword, result.salt);
	  	var correctPwd=result.pwd;
	  	if(inPwd==correctPwd){
	  		 console.log(result.email);
	  		 		 console.log(result.salt);
  	 console.log(result.pwd);
  	 res.send(JSON.stringify({ "result" : "true" }));
	  	}
	  	else{
	  		res.send(JSON.stringify({ "result" : "false" }));
	  	}
	  }
	  else{
	  	res.send(JSON.stringify({ "result" : "false" }));	
	  }
  	
  });
})

app.post('/registerUser', function (req, res) {

	console.log('REGISTERING USER-pwd'+req.body.email);
	
	console.log(req.body);
	var salt = saltAndHash.genSalt(16);
	var passwordData = saltAndHash.sha512(req.body.pwd, salt);
	req.body.salt= salt;
	req.body.pwd=passwordData;
	console.log(req.body.salt+'HASHED--'+passwordData);
	var insertion=mongoConnect.insert(mongoUrl,'user_details',req.body,function(result){
			res.setHeader('Access-Control-Allow-Origin', '*');
	 res.setHeader('Content-Type', 'application/json');

	  if(result.ok=1){

  	 res.send(JSON.stringify({ "result" : "true" }));
	  	}
	  	else{
	  		res.send(JSON.stringify({ "result" : "false" }));
	  	}
	 
	});

})

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] ;
      console.log( user );
       // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.end( JSON.stringify(user));
   });
})

app.delete('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var server = app.listen(8081,"127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port
//  var f={"email":"parthiban.rajalingam@gmail.com"};
  console.log("HOST--"+host);
  console.log("Example app listening at http://%s:%s", host, port)

})

