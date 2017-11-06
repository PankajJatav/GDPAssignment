/* * ************************************************************ 
 * Date: 31 Oct, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Schema for offer collection
 * Typescript file offer.js
 * *************************************************************** */


// Load required packages
var mongoose = require('mongoose');
const discountType = { 
    FREE: "Free Goods" ,
    DISCOUNT: "discount"
};

const discountCode = {
    PRICE: "Price Discount",
    PERCENT: "Percent Discount",
    GOODS: "Free Goods"
}

// Define our offer schema
var OfferSchema = new mongoose.Schema({

    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    name: {
        type: String,
        unique: true,
        required: true
    },
    
    type: {
        type: String,
        enum: Object.keys(discountType),
        required: true
    },

    code: {
        type: String,
        enum: Object.keys(discountCode),
        required: true
    },

    offer_amount: {
        type: Number,
        required: true
    },

    quantity: {
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