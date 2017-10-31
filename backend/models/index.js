/* * ************************************************************ 
 * Date: 31 Oct, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Index file for mongoose connection
 * Javascript file index.js
 * *************************************************************** */

// Bring Mongoose into the app 
var mongoose = require( 'mongoose' ); 
var mongoConfig = require('../../configs/db.json')['development'];

// Build the connection string 
var dbURI = 'mongodb://'+mongoConfig.host+':'+ mongoConfig.port +'/'+ mongoConfig.database; 

// Create the database connection 
mongoose.connect(dbURI); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

require('./discount');
require('./offer');
require('./product');
