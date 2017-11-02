'use strict';

/* * ************************************************************ 
 * Date: 01 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Product class for perform product operations
 * Typescript file product.js
 * *************************************************************** */

var Product = require('./../models/product');
var BaseController = require('./base');

class ProductController extends BaseController {
	constructor() {
		super();
		this.model = Product;
		this.module = 'Product';
	}
}

module.exports = new ProductController();
