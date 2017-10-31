/* * ************************************************************ 
 * Date: 31 Oct, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Schema for discount collection
 * Typescript file discount.js
 * *************************************************************** */


// Load required packages
var mongoose = require('mongoose');

// Define our discount schema
var DiscountSchema = new mongoose.Schema({
    
    _id: {
        type: String,
        required: true
    },

    user_id: {
        type: String,
        required: true
    },

    offer_code: {
        type: String,
        required: true
    },
    
    is_active: {
        type: Boolean,
        required: true
    },

    expiry_date: {
        type: Date,
        required: true
    },

    created_at: {
        type: Date 
    },
    
    updated_at: {
        type: Date 
    }
});

DiscountSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
    this._id = this._id.toString();
  }
  next();
});

// Export the Mongoose model
module.exports = mongoose.model('Discount', DiscountSchema);