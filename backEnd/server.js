var saltAndHash = require('./saltAndHash');
var mongoConnect = require('./mongoConnection');
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var nodemailer= require('nodemailer');//Mail
var subject='';
var receiver='';
var content='';
var sender='trackmydevice.tmd@gmail.com';
var passEmail='trackmydevice13!';
var uiUrl='http://localhost:4200/#/';
var transporter= nodemailer.createTransport({service: 'gmail',

	auth:{
		user:sender,
		pass:passEmail
}
	});


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var server_port=process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address= process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var mongoUrl='mongodb://localhost:27017/trackMyDevice'; //dev param

/*var db_user_name='admin';
var db_pwd='1HBNxnHpbBzH';
var mongoUrl= 'mongodb://'+db_user_name+':'+db_pwd+'@'+process.env.OPENSHIFT_MONGODB_DB_HOST+':'+process.env.OPENSHIFT_MONGODB_DB_PORT+'/firstapp' || 'mongodb://localhost:27017/trackMyDevice';*/
//--------------------------------------
app.get('/trackingDetails', function (req, res) {

console.log('getting tracking details---'+req.query.imei);

	var queryParam={"imei":req.query.imei};
	console.log(queryParam);
	res.setHeader('Access-Control-Allow-Origin', '*');
	 res.setHeader('Content-Type', 'application/json');
	  mongoConnect.findAll(mongoUrl,'tracking_details',queryParam,function(result){
	  	if(result != null){
	  		console.log('SENDING RESSS'+result);
	  	res.send(JSON.stringify(result));
	  }
	  else{
	  	res.send(JSON.stringify({ "imei" : "false" }));	
	  }
  	
  });

})

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

app.post('/checkLogin',function(req,res,err){
	console.log('CHECK LOGGING IN----'+req.body);

	var queryParam={"pwd":req.body.pwd};
	console.log(queryParam);
	var inPassword=req.body.pwd;
	console.log(inPassword);
	res.setHeader('Access-Control-Allow-Origin', '*');
	 res.setHeader('Content-Type', 'application/json');

	  mongoConnect.find(mongoUrl,'user_details',queryParam,function(result){
	  	if(result != null){
	  	var inPwd = saltAndHash.sha512(inPassword, result.salt);
	  	var email=result.email;
		res.send(JSON.stringify({ "result" : "true","email":email }));
	  }
	  else{
	  	res.send(JSON.stringify({ "result" : "false" }));	
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

app.get('/checkUser',function(req,res){
	var mail={"email": req.query.email};
	var checkExistingUser=mongoConnect.countDoc(mongoUrl,'user_details',mail,function(count){
console.log("Checking COunt",count);
	res.setHeader('Access-Control-Allow-Origin', '*');
	 res.setHeader('Content-Type', 'application/json');
	  if(count==0){
  	 res.send(JSON.stringify({ "result" : "false" }));
	  	}
	  	else{
	  		res.send(JSON.stringify({ "result" : "true" }));
	  	}
	 
	});
})

app.get('/resetPassword',function(req,res){
	var mail={"email": req.query.email};

console.log('QUER----'+mail);
	var resetPwd=mongoConnect.find(mongoUrl,'user_details',mail,function(result){
console.log("Checking valid user",result);
	res.setHeader('Access-Control-Allow-Origin', '*');
	 res.setHeader('Content-Type', 'application/json');
	  	if(result != null){
	  	var correctPwd=result.pwd;
	  	receiver= req.query.email;
	  	subject="Reset Password link";
	  	content="http://127.0.0.1:8081/setNewPassword?q="+correctPwd;
		htmlCOntent= "Hi User,<br><br>Please click the below link to change your password."+ 
	  	"If you have not generated this reset link, don't be alarmed. Your account is still scecure. <br><br>"+content
	  	+"<br><br> Regards, <br> TMD Team.";

	  	var mailOptions={
	from:sender,
	to:receiver,
	subject: subject,
	//text: content,
	html: htmlCOntent
};
	  	transporter.sendMail(mailOptions, function(error, info){
 		 if (error) {
  		  console.log(error);
  		  res.send(JSON.stringify({ "result" : "false"}));
 		 } else {
 		 	res.send((JSON.stringify({ "result" : "true" })));
   		 console.log('Email sent: ' + info.response);
 		 }
		});
	  }
	  else{
	  	res.send(JSON.stringify({ "result" : "invalid" }));	
	  }
	 
	});
})


app.get('/setNewPassword',function(req,res){
var pwd={"pwd": req.query.q};

console.log('setNewPwd----'+req.query.q);
	var resetPwd=mongoConnect.find(mongoUrl,'user_details',pwd,function(result){
console.log("Checking valid user",result);
	res.setHeader('Access-Control-Allow-Origin', '*');
	 res.setHeader('Content-Type', 'application/json');
	  	if(result != null){
	  	var url=uiUrl+'setNewPassword?&q='+req.query.q;
	  	console.log('URL REDIRECTION--'+url);
	  	res.redirect(url);
	  }
	  else{
	  	var url=uiUrl+'notAuth';
	  	res.redirect(url);
	  	//res.send(JSON.stringify({ "result" : "false" }));	
	  }
	 
	});
})


app.post('/registerUser', function (req, res) {

var mail={"email": req.body.email};
var checkExistingUser=mongoConnect.countDoc(mongoUrl,'user_details',mail,function(count){
console.log("Checking COunt",count);
	  if(count==0){
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
	  	}
	  	else{
	  		res.send(JSON.stringify({ "result" : "duplicate" }));
	  	}
	 
	});
	

})

app.post('/resettingPwd', function (req, res) {

var mail={"email": req.body.email};


console.log('RESETTING USER-pwd'+req.body.email);
	
	console.log(req.body);
	var salt = saltAndHash.genSalt(16);
	var passwordData = saltAndHash.sha512(req.body.pwd, salt);
	req.body.salt= salt;
	req.body.pwd=passwordData;
	console.log(req.body.salt+'HASHED--'+passwordData);
	var updation=mongoConnect.update(mongoUrl,'user_details',mail,req.body,function(result){
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

/*var server = app.listen(8081,"127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port
//  var f={"email":"parthiban.rajalingam@gmail.com"};
  console.log("HOST--"+host);
  console.log("Example app listening at http://%s:%s", host, port)

})*/

var server = app.listen(server_port,server_ip_address, function () {

  var host = server.address().address
  var port = server.address().port
//  var f={"email":"parthiban.rajalingam@gmail.com"};
  console.log("HOST--"+host);
  console.log("Example app listening at http://%s:%s", host, port)

})

