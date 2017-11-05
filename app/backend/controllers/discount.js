'use strict';

/* * ************************************************************ 
 * Date: 01 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Discount class for perform discount operations
 * Typescript file discount.js
 * *************************************************************** */

var Discount = require('./../models/discount');
var User = require('./../models/user')
var Offer = require('./../models/offer')
var messages = require("./../consts/messages");
var codes = require("./../consts/codes");

var BaseController = require('./base');


class DiscountController extends BaseController {

	constructor() {
		super();
		this.model = Discount;
		this.module = 'Discount';
		this.__super__ = BaseController;
	}
}

module.exports = new DiscountController();

