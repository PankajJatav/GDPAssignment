/* * ************************************************************ 
 * Date: 04 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Integration Test file for product API
 * Typescript file routes.product.test.js
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

describe('Routes:', () => {
    chai.use(chaiHttp);
    //Our parent block
    describe('Product:', () => {       

        describe('POST /api/product', () => {

            beforeEach((done) => { //Before each test we empty the database
                Product.remove({}, (err) => { 
                   done();         
                });
            });

            it('it should create a new doc', (done) => {

                let postData = {
                    "code": faker.random.uuid(6),
                    "name": faker.commerce.productName(),
                    "price": faker.commerce.price()
                }

                chai.request(server)
                    .post('/api/product')
                    .send(postData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(201);
                        expect(body.data).to.be.an('object');
                        done();
                    });
            });

            it('it should not create a new doc when required key is missing', (done) => {
                let postData = {
                    "code": faker.random.uuid(6),
                    "name": faker.commerce.productName()
                }

                chai.request(server)
                    .post('/api/product')
                    .send(postData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            it('it should not create a new doc when send invalid value', (done) => {
                
                let postData = {
                    "code": faker.random.uuid(6),
                    "name": faker.commerce.productName(),
                    "price": "Invalid"
                }

                chai.request(server)
                    .post('/api/product')
                    .send(postData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                Product.remove({}, (err) => { 
                   done();         
                });
            });

        });

        describe('PUT /api/product/productId', () => {

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

                let putData = {
                    "name": faker.commerce.productName()
                }

                chai.request(server)
                    .put('/api/product/'+docId)
                    .send(putData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        done();
                    });
            });

            it('it should not update doc with invalid docId', (done) => {
                
                chai.request(server)
                    .put('/api/product/Invalide doc id')
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            it('it should not update doc with invalid value', (done) => {
                

                let putData = {
                    price: "Invalid"
                }

                chai.request(server)
                    .put('/api/product/Invalide doc id')
                    .send(putData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                Product.remove({}, (err) => { 
                   done();
                });
            });
        
        });

        describe('GET /api/product', () => {
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
                
                chai.request(server)
                    .get('/api/product')
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        expect(body.data).to.be.an('array');
                        expect(body.data.length).to.equal(1);
                        done();
                    });
            })

            after((done) => { //Before each test we empty the database
                Product.remove({}, (err) => { 
                   done();         
                });
            });

        });

        describe('GET /api/product/productId', () => {
            var docId ;
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
                
                chai.request(server)
                    .get('/api/product/'+docId)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        expect(body.data).to.be.an('object');
                        done();
                    });
            });

            it('it should not get doc with invalid Id', (done) => {
                
                chai.request(server)
                    .get('/api/product/Invalid Id')
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                Product.remove({}, (err) => { 
                   done();         
                });
            });
        });

        describe('DELETE /api/product/productId', () => {
            var docId ;
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
                
                chai.request(server)
                    .delete('/api/product/'+docId)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        done();
                    });
            });

            it('it should not delete doc with invalid Id', (done) => {
                
                chai.request(server)
                    .delete('/api/product/Invalid Id')
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                Product.remove({}, (err) => { 
                   done();         
                });
            });
        })

    });
});
