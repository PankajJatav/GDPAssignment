'use strict';

/* * ************************************************************ 
 * Date: 01 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Offer class for perform offer operations
 * Typescript file offer.js
 * *************************************************************** */

var Offer = require('./../models/offer');
var BaseController = require('./base');

class OfferController extends BaseController {
	constructor() {
		super();
		this.model = Offer;
		this.module = 'Offer';
		this.__super__ = BaseController;
	}
}

module.exports = new OfferController();