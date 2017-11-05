'use strict';

/* * ************************************************************ 
 * Date: 04 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : User class for perform user operations
 * Typescript file user.js
 * *************************************************************** */

var User = require('./../models/user');
var Product = require('./../models/product');
var BaseController = require('./base');
var messages = require("./../consts/messages");
var codes = require("./../consts/codes");

class UserController extends BaseController {
	constructor() {
		super();
		this.model = User;
		this.module = 'User';
	}

	getBill(req ,res) {
		let data = req.body.products;
		let user = req.body.username;

		if (!user) {
			res.json({ 
                code: codes.FOEBIDDEN,
                message: messages.USER__REQUIRED,
            });
            return;
		}

		if(!data && !data.length) {
			res.json({ 
                code: codes.FOEBIDDEN,
                message: messages.PRODUCT__REQUIRED,
            });
            return;
		}
		let productArray = data.reduce((object, item, index) => {
			if(object[item]) {
				object[item] += 1;
			} else {
				object[item] = 1;
			}
			return object;
		},{});
		let pipeline = [
			{ 
				"$match": { username: user } 
			},
		    {
		        "$lookup": {
		          from: "discounts",
		          localField: "_id",
		          foreignField: "user_id",
		          as: "discounts"    
		        }
		    },
		    { 
		    	"$unwind": "$discounts" 
		    },
		    { 
		    	"$match": { 
		    		"discounts.is_active": true 
		    	}  
		    },
		    {
		        "$lookup": {
		          from: "offers",
		          localField: "discounts.offer_id",
		          foreignField: "_id",
		          as: "offer"  
		        }
		    },
		    {
		        "$unwind": "$offer"
		    },
		    {
		        "$lookup": {
		          from: "products",
		          localField: "offer.product_id",
		          foreignField: "_id",
		          as: "product" 
		        }
		    },
		    {
		        "$unwind": "$product"
		    },
		    {
		    	"$match" : {
		    		"product.code": { 
		    			"$in" : Object.keys(productArray) 
		    		}
		    	},
		    },
		    {
		        "$project": {
		            offer: 1,
		            product: 1
		         }
		    }
		];
		Product.find({ code: { "$in" : Object.keys(productArray) } }, (err, products) => {
			if(err){
				res.json({ 
                    code: codes.FOEBIDDEN,
                    message: messages.FOEBIDDEN_ERROR,
                    error: err
                });
                return;
			}
			var totalPrice = products.reduce( (total, doc) => {
				var quantity = productArray[doc.code];
				total += quantity * doc.price;
				return total;
			}, 0);
			User.aggregate(pipeline, (err, docs) => {
				if(err){
					res.json({ 
	                    code: codes.FOEBIDDEN,
	                    message: messages.FOEBIDDEN_ERROR,
	                    error: err
	                });
					return;
				}
				var discountAmount = docs.reduce((total, doc)=>{
					if(!doc || !doc.product || !doc.product.code){
						return total;
					}
					var quantity = productArray[doc.product.code];
					
					// retrun if minimum quantity not bought
					if( !quantity || !doc.offer || doc.offer.quantity > quantity ){
						return total;
					}
					if( doc.offer.type == "FREE" ) {
						if ( doc.offer.code == "GOODS" ) {
							var freeGoodQuantity = parseInt( quantity / doc.offer.quantity );
							total += freeGoodQuantity * (doc.product.price || 0);
						} 
						return total;
					} else if ( doc.offer.type == "DISCOUNT" ) {
						if( doc.offer.code == "PRICE" ) {
							total += quantity* (doc.offer.offer_amount || 0);
						} else if ( doc.offer.code == "PERCENT" ) {
							var amount = ( (doc.product.price || 0 ) / 100 ) * ( doc.offer.offer_amount || 0)  
							total += quantity * amount;
						}
						return total;
					} else {
						return total;
					}
				},0) ;
				res.json({
					code: codes.SUCCESS,
	                message: messages.FIND,
	                data: {
	                    totalPrice: totalPrice,
	                    discountAmount: discountAmount,
	                    finalPrice: totalPrice - discountAmount
	                }
				});
				return;
			})
		});
	}
}

module.exports = new UserController();
