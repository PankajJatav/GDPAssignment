/* * ************************************************************ 
 * Date: 01 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Product Controller for perform product operations
 * Typescript file product.js
 * *************************************************************** */

var Product = require('./../models/product');
var util = require('util');
var baseController = require('./base');

function productController() {
    console.log('Called');
    productController.super_.call(this, Product);
};

util.inherits(productController, baseController);

/*
============ Add Additional Methods ================
*/

module.exports = new productController();