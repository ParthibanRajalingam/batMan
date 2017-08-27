var MongoClient = require('mongodb').MongoClient;
	var db = null; // global variable to hold the connection
	var flag=true;
  var docStore;

var insertDocument =  function(db,collectionName,doc, callback) {
   db.collection(collectionName).insertOne( doc, function(err, result) {

 
flag=result;
    console.log("Inserted a document"+result);
    callback();
  });
};

var updateDocument =  function(db,collectionName,doc, newValues,callback) {
   db.collection(collectionName).updateOne( doc,newValues, function(err, result) {
if(err) throw err;
 
docStore=result;
    console.log("Updated a document"+result);
    callback();
  });
};

var findDocument =  function(db,collectionName,doc, callback) {
   db.collection(collectionName).findOne( doc, function(err, result) {
if(err) throw err;
 
docStore=result;
    console.log("found a document"+result);
    callback();
  });
};

var findAllDocument =  function(db,collectionName,doc, callback) {

   db.collection(collectionName).find(doc).toArray(function(error, result) {
    if (error) throw error;
    docStore=result;
        console.log("found a document"+result);
    callback();
});
};

var countDocument =  function(db,collectionName,doc, callback) {
  console.log("Trying to count"+doc);
   db.collection(collectionName).count(doc,function(error, result) {
    if (error) throw error;
    docStore=result;
        console.log("found a document"+result);
    callback();
});
   
};


module.exports={

insert: function(url,collectionName,doc,callback){

MongoClient.connect(url, function(err, db) {

  insertDocument(db,collectionName,doc, function() {
      db.close();
      console.log('FLAG---'+flag);
      callback(flag);
  });
}) ;

}
,
find: function(url,collectionName,doc,callback){
MongoClient.connect(url, function(err, db) {

  findDocument(db,collectionName,doc, function() {
      db.close();
    //  console.log(docStore);
      callback(docStore);
  });
}) ;
},

countDoc: function(url,collectionName,doc,callback){
  
MongoClient.connect(url, function(err, db) {

  countDocument(db,collectionName,doc, function() {
      db.close();
      console.log('------'+docStore);
      callback(docStore);
  });
}) ;


},

findAll: function(url,collectionName,doc,callback){
  
MongoClient.connect(url, function(err, db) {

  findAllDocument(db,collectionName,doc, function() {
      db.close();
    //  console.log(docStore);
      callback(docStore);
  });
}) ;


},

update: function(url,collectionName,doc,newValues,callback){
  
MongoClient.connect(url, function(err, db) {

  updateDocument(db,collectionName,doc,newValues, function() {
      db.close();
    //  console.log(docStore);
      callback(docStore);
  });
}) ;


}

}