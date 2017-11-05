/* * ************************************************************ 
 * Date: 06 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Unit Test file for user controller
 * Typescript file controllers.user.test.js
 * *************************************************************** */

let mongoose = require("mongoose");
var Models = require('./../../backend/models');
const userController = require('./../../backend/controllers/user');

//Require the dev-dependencies
let chai = require('chai');
var faker = require("faker");
var expect  = require('chai').expect;
let chaiHttp = require('chai-http');
let server = require('./../../app');
let should = chai.should();

describe('Controller:', () => {
	chai.use(chaiHttp);
	//Our parent block
	describe('User:', () => {

		before((done)=>{
            Models.seed((err)=>{
                if(err){
                    done(error);
                    return;
                } else{
                    done();
                }
            });
        });
	  	describe('Get User Bill', () => {
		  	it('it should get the use bill', (done) => {
		  		let reqObject = {
		  			body: {
		  				"username": "ford",
	                    "products": ["classic", "standout", "premium"]
		  			}
		  		}

		  		let resObject = {
		  			json: function(jsonResponse){
		  				expect(jsonResponse.code).to.equal(200);
		  				done();	
		  			}
		  		}
		  		userController.getBill(reqObject, resObject); 
		  	});
		});

		describe('Get User Bill With missing user', () => {
		  	it('it should get the use bill', (done) => {
		  		let reqObject = {
		  			body: {
	                    "products": ["classic", "standout", "premium"]
		  			}
		  		}

		  		let resObject = {
		  			json: function(jsonResponse){
		  				expect(jsonResponse.code).to.equal(403);
		  				done();	
		  			}
		  		}
		  		userController.getBill(reqObject, resObject); 
		  	});
		});

	})
});