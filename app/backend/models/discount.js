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
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    offer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer',
        required: true
    },
    
    is_active: {
        type: Boolean,
        required: true
    },

    is_expire: {
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
        this.is_expire = false;
        this.is_active = true;
        this.created_at = now;
        this._id = this._id.toString();
  }
  next();
});

// Export the Mongoose model
module.exports = mongoose.model('Discount', DiscountSchema);