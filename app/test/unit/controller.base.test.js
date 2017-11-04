/* * ************************************************************ 
 * Date: 04 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Unit Test file for base controller
 * Typescript file controllers.base.test.js
 * *************************************************************** */

let mongoose = require("mongoose");
let Product = require('./../../backend/models/product');

//Require the dev-dependencies
let chai = require('chai');
var faker = require("faker");
var expect  = require('chai').expect;
let chaiHttp = require('chai-http');
let server = require('./../../app');
let should = chai.should();
const BaseController = require('./../../backend/controllers/base');

describe('Controller:', () => {
	chai.use(chaiHttp);
	//Our parent block
	describe('Base:', () => {	    

	  	it('it should give errot when call base class function without initlize model', (done) => {
	  		let baseController = new BaseController();
	  		let resObject = {
	  			json: function(jsonResponse){
	  				expect(jsonResponse.code).to.equal(403);
	  				done();
	  			}
	  		}
	  		baseController.create(null, resObject); 
	  	});

	  	describe('Create New Doc', () => {

	  		beforeEach((done) => { //Before each test we empty the database
		        Product.remove({}, (err) => { 
		           done();         
		        });
		    });

		  	it('it should create a new doc', (done) => {
		  		let baseController = new BaseController();
		  		baseController.model = Product;
		  		let reqObject = {
		  			body: {
		  				"code": faker.random.uuid(6),
		                "name": faker.commerce.productName(),
		                "price": faker.commerce.price()
		  			}
		  		}

		  		let resObject = {
		  			json: function(jsonResponse){
		  				expect(jsonResponse.code).to.equal(201);
		  				let docId = jsonResponse.data._id;
		  				Product.findOne({_id:docId}, (err, doc)=>{
		  					expect(doc).to.be.an('object');
		  					done();
		  				})
		  			}
		  		}
		  		baseController.create(reqObject, resObject); 
		  	});

		  	it('it should not create a new doc when required key is missing', (done) => {
		  		let baseController = new BaseController();
		  		baseController.model = Product;
		  		let reqObject = {
		  			body: {
		  				"code": faker.random.uuid(6),
		                "name": faker.commerce.productName(),
		  			}
		  		}

		  		let resObject = {
		  			json: function(jsonResponse){
		  				expect(jsonResponse.code).to.equal(403);
		  				expect(jsonResponse.error).to.be.an('object');
		  				done();
		  			}
		  		}
		  		baseController.create(reqObject, resObject); 
		  	});

		  	it('it should not create a new doc when send invalid value', (done) => {
		  		let baseController = new BaseController();
		  		baseController.model = Product;
		  		let reqObject = {
		  			body: {
		  				"code": faker.random.uuid(6),
		                "name": faker.commerce.productName(),
		                "price": "Invalid"
		  			}
		  		}

		  		let resObject = {
		  			json: function(jsonResponse){
		  				expect(jsonResponse.code).to.equal(403);
		  				expect(jsonResponse.error).to.be.an('object');
		  				done();
		  			}
		  		}
		  		baseController.create(reqObject, resObject); 
		  	});

		  	after((done) => { //Before each test we empty the database
		        Product.remove({}, (err) => { 
		           done();         
		        });
		    });

	  	});

	  	describe('Update Doc', () => {
	  		let baseController = new BaseController();
	  		var docId ;
		  	baseController.model = Product;

	  		before(function(done) {
			    let insertData = {
	  				"code": faker.random.uuid(6),
	                "name": faker.commerce.productName(),
	                "price": faker.commerce.price()
	  			};
	  			Product.create(insertData, function(err, doc){
	  				if(err){
	  					done(err);
	  				} else {
	  					docId = doc._id;
	  					done();
	  				}

	  			})
			});

	  		it('it should update doc', (done) => {
		  		let reqObject = {
		  			params: {
		  				id: docId
		  			},
		  			body: {
		  				"name": faker.commerce.productName()
		  			}
		  		}

		  		let resObject = {
		  			json: function(jsonResponse){
		  				expect(jsonResponse.code).to.equal(200);
		  				done();
		  			}
		  		}
		  		baseController.update(reqObject, resObject);
		  	});

	  		it('it should not update doc with invalid docId', (done) => {
	  			let reqObject = {
		  			params: {
		  				id: 'Invalide doc id'
		  			}
		  		}

		  		let resObject = {
		  			json: function(jsonResponse){
		  				expect(jsonResponse.code).to.equal(403);
		  				done();
		  			}
		  		}
		  		baseController.update(reqObject, resObject);
		  	});

		  	it('it should not update doc with invalid value', (done) => {
	  			let reqObject = {
		  			params: {
		  				id: 'Invalid doc id'
		  			},
		  			body: {
		  				price: "Invalid"
		  			}
		  		}

		  		let resObject = {
		  			json: function(jsonResponse){
		  				expect(jsonResponse.code).to.equal(403);
		  				expect(jsonResponse.error).to.be.an('object');
		  				done();
		  			}
		  		}
		  		baseController.update(reqObject, resObject);
		  	});

		  	after((done) => { //Before each test we empty the database
		        Product.remove({}, (err) => { 
		           done();         
		        });
		    });

	  	});

	  	describe('Get Docs', () => {
	  		let baseController = new BaseController();
	  		baseController.model = Product;

	  		before(function(done) {
			    let insertData = {
	  				"code": faker.random.uuid(6),
	                "name": faker.commerce.productName(),
	                "price": faker.commerce.price()
	  			};
	  			Product.create(insertData, function(err, doc){
	  				if(err){
	  					done(err);
	  				} else {
	  					done();
	  				}

	  			})
			});

	  		it('it should get doc list', (done) => {
		  		let reqObject = {
		  			params: {
		  			}
		  		}

		  		let resObject = {
		  			json: function(jsonResponse){
		  				expect(jsonResponse.code).to.equal(200);
		  				expect(jsonResponse.data).to.be.an('array');
		  				expect(jsonResponse.data.length).to.equal(1);
		  				done();
		  			}
		  		}
		  		baseController.getlist(reqObject, resObject);
	  		})

	  		after((done) => { //Before each test we empty the database
		        Product.remove({}, (err) => { 
		           done();         
		        });
		    });

	  	});

	  	describe('Get Doc By Id', () => {
	  		let baseController = new BaseController();
	  		var docId ;
		  	baseController.model = Product;

	  		before(function(done) {
			    let insertData = {
	  				"code": faker.random.uuid(6),
	                "name": faker.commerce.productName(),
	                "price": faker.commerce.price()
	  			};
	  			Product.create(insertData, function(err, doc){
	  				if(err){
	  					done(err);
	  				} else {
	  					docId = doc._id;
	  					done();
	  				}

	  			})
			});

	  		it('it should get doc', (done) => {
		  		let reqObject = {
		  			params: {
		  				id: docId
		  			}
		  		}

		  		let resObject = {
		  			json: function(jsonResponse){
		  				expect(jsonResponse.code).to.equal(200);
		  				expect(jsonResponse.data).to.be.an('object');
		  				done();
		  			}
		  		}
		  		baseController.getById(reqObject, resObject);
	  		});

	  		it('it should not get doc with invalid Id', (done) => {
		  		let reqObject = {
		  			params: {
		  				id: "Invalid Id"
		  			}
		  		}

		  		let resObject = {
		  			json: function(jsonResponse){
		  				expect(jsonResponse.code).to.equal(403);
		  				expect(jsonResponse.error).to.be.an('object');
		  				done();
		  			}
		  		}
		  		baseController.getById(reqObject, resObject);
	  		});

	  		after((done) => { //Before each test we empty the database
		        Product.remove({}, (err) => { 
		           done();         
		        });
		    });
	  	});

	  	describe('Delete Doc By Id', () => {
	  		let baseController = new BaseController();
	  		var docId ;
		  	baseController.model = Product;

	  		before(function(done) {
			    let insertData = {
	  				"code": faker.random.uuid(6),
	                "name": faker.commerce.productName(),
	                "price": faker.commerce.price()
	  			};
	  			Product.create(insertData, function(err, doc){
	  				if(err){
	  					done(err);
	  				} else {
	  					docId = doc._id;
	  					done();
	  				}

	  			})
			});

	  		it('it should delete doc', (done) => {
		  		let reqObject = {
		  			params: {
		  				id: docId
		  			}
		  		}

		  		let resObject = {
		  			json: function(jsonResponse){
		  				expect(jsonResponse.code).to.equal(200);
		  				done();
		  			}
		  		}
		  		baseController.delete(reqObject, resObject);
	  		});

	  		it('it should not delete doc with invalid Id', (done) => {
		  		let reqObject = {
		  			params: {
		  				id: "Invalid Id"
		  			}
		  		}

		  		let resObject = {
		  			json: function(jsonResponse){
		  				expect(jsonResponse.code).to.equal(403);
		  				expect(jsonResponse.error).to.be.an('object');
		  				done();
		  			}
		  		}
		  		baseController.delete(reqObject, resObject);
	  		});

	  		after((done) => { //Before each test we empty the database
		        Product.remove({}, (err) => { 
		           done();         
		        });
		    });
	  	})

	});
});
