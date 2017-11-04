/* * ************************************************************ 
 * Date: 31 Oct, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Entry file for node server
 * Javascript file index.js
 * *************************************************************** */


var express = require('express');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var mongoose = require( 'mongoose' ); 
mongoose.Promise = global.Promise;
const NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./configs/server')[NODE_ENV];


var mongoConfig = require('./configs/db.json')[NODE_ENV];
var dbURI = 'mongodb://'+mongoConfig.host+':'+ mongoConfig.port +'/'+ mongoConfig.database; 


var app = express();

app.set('port', (process.env.PORT || config.port));

var apiRoutes = express.Router();

app.use(bodyParser.json());
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
    extended: false
}));

/* *
    This will allow to CORS 
*/
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*' );

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

// Don't show log for test envirment
if(NODE_ENV !== 'test') {
    app.use(morgan('dev'));   
}

app.disable('etag');

var routes = require("./backend/routes")(app, apiRoutes);

mongoose.connect(dbURI); 

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
  app.listen(app.get('port'), function() {
        console.log('MERN App listening on port ' + app.get('port'));
    });
});

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});


module.exports = app;