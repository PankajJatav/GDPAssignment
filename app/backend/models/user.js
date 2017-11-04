/* * ************************************************************ 
 * Date: 04 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Schema for user collection
 * Typescript file user.js
 * *************************************************************** */


// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
	
	username: {
		type: String,
		unique: true,
        required: true
	},

	created_at: {
        type: Date 
    },
    
    updated_at: {
        type: Date 
    }
});

UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
    this._id = this._id.toString();
  }
  next();
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);