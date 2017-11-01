/* * ************************************************************ 
 * Date: 31 Oct, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Schema for offer collection
 * Typescript file offer.js
 * *************************************************************** */


// Load required packages
var mongoose = require('mongoose');

// Define our offer schema
var OfferSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },

    code: {
        type: String,
        unique: true,
        required: true
    },
    
    type: {
        type: String,
        unique: true,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    created_at: {
        type: Date 
    },
    
    updated_at: {
        type: Date 
    }
});

OfferSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this._id = this._id.toString();
    this.created_at = now;
  }
  next();
});

// Export the Mongoose model
module.exports = mongoose.model('Offer', OfferSchema);