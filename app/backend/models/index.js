/* * ************************************************************ 
 * Date: 31 Oct, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Index file for mongoose models
 * Javascript file index.js
 * *************************************************************** */

// Import all models
const Discount =  require('./discount');
const Offer =  require('./offer');
const Product =  require('./product');
const User =  require('./user');

var productSeed = require("./../../seed/product");
var offerSeed = require("./../../seed/offer");
var userSeed = require("./../../seed/user");
var discountSeed = require("./../../seed/discount");

/**
	Insert seed data in app
*/

module.exports.seed = function(callback) {
	new Promise(function(resolve, reject) {
                Product.count({}, (err, count) => {
                    if(!count){
                        Product.insertMany(productSeed, (err, doc) => {
                            if(err){
                                reject(err)
                                return;
                            }
                            resolve();
                        })
                    } else {
                        resolve();
                    }
                })
                
            }).then(function(result) {
                return new Promise(function(resolve, reject) {
                    Offer.count({}, (err, count) => {
                        if(!count){
                            Offer.insertMany(offerSeed, (err, doc) => {
                                if(err){
                                    reject(err)
                                    return;
                                }
                                resolve();
                            })
                        } else {
                            resolve();
                        }
                    });
                });
            }).then(function(result) {
                return new Promise((resolve, reject) => { 
                    User.count({}, (err, count) => {
                        if(!count){
                            User.insertMany(userSeed, (err, doc) => {
                                if(err){
                                    reject(err);
                                    return;
                                }
                                resolve();
                            });
                        } else {
                            resolve();
                        }
                    }); 
                });
            }).then(function(result) {
                return new Promise((resolve, reject) => { 
                    Discount.count({}, (err, count) => {
                        if(!count){
                            Discount.insertMany(discountSeed, (err, doc) => {
                                if(err){
                                    reject(err);
                                    return;
                                }
                                resolve();
                            });
                        } else {
                            resolve();
                        }
                    });
                });
            }).then(function(result) {
                callback(null, result);
                console.log("Seed Data Inserted Successfully");
            }).catch(function(error){
                callback(error);
            	console.error("Error Occur While Inserting Seed Data", error);
            });
}
