/* * ************************************************************ 
 * Date: 31 Oct, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Schema for product collection
 * Typescript file product.js
 * *************************************************************** */


// Load required packages
var mongoose = require('mongoose');

// Define our product schema
var ProductSchema = new mongoose.Schema({
    
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

    price: {
        type: Number,
        required: true
    },

    currencyId: {
        type: String,
        required: false
    },

    currencyCode: {
        type: String,
        required: false
    },

    created_at: {
        type: Date 
    },
    
    updated_at: {
        type: Date 
    }
});

ProductSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this._id = this._id.toString();
    this.created_at = now;
  }
  next();
});

// Export the Mongoose model
module.exports = mongoose.model('Product', ProductSchema);