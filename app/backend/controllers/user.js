'use strict';

/* * ************************************************************ 
 * Date: 04 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : User class for perform user operations
 * Typescript file user.js
 * *************************************************************** */

var User = require('./../models/user');
var BaseController = require('./base');

class UserController extends BaseController {
	constructor() {
		super();
		this.model = User;
		this.module = 'User';
	}
}

module.exports = new UserController();
