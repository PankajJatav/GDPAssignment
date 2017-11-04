/* * ************************************************************ 
 * Date: 04 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Integration Test file for offer API
 * Typescript file routes.offer.test.js
 * *************************************************************** */

let mongoose = require("mongoose");
let Offer = require('./../../backend/models/offer');
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
    describe('Offer:', () => {  
        var productId;
        before((done)=>{
            let productData = {
                    "code": faker.random.uuid(6),
                    "name": faker.commerce.productName(),
                    "price": faker.commerce.price()
                };
                Product.create(productData, (err, doc) => {
                    if(err){
                        return;
                        done(err);
                    }
                    productId = doc._id;
                    done();
                })
        })     

        describe('POST /api/offer', () => {

            beforeEach((done) => { //Before each test we empty the database
                Offer.remove({}, (err) => { 
                   done();         
                });
            });

            it('it should create a new doc', (done) => {

                let postData = {
                    "product_id": productId,
                    "name": "Buy 2 Get 50 Percent Off",
                    "type": "DISCOUNT",
                    "code": "PERCENT",
                    "offer_amount": 50,
                    "quantity": 2
                };

                chai.request(server)
                    .post('/api/offer')
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
                    "product_id": productId,
                    "name": "Buy 2 Get 50 Percent Off",
                    "type": "DISCOUNT",
                    "code": "PERCENT",
                }

                chai.request(server)
                    .post('/api/offer')
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
                    "product_id": productId,
                    "name": "Buy 2 Get 50 Percent Off",
                    "type": "DISCOUNT",
                    "code": "PERCENT",
                    "offer_amount": "Invalid",
                    "quantity": 2
                }

                chai.request(server)
                    .post('/api/offer')
                    .send(postData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                Offer.remove({}, (err) => { 
                   done();         
                });
            });
        });

        describe('PUT /api/offer/offerId', () => {

            before(function(done) {
                let insertData = {
                    "product_id": productId,
                    "name": "Buy 2 Get 50 Percent Off",
                    "type": "DISCOUNT",
                    "code": "PERCENT",
                    "offer_amount": 50,
                    "quantity": 2
                };
                Offer.create(insertData, function(err, doc){
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
                    "name": "Buy 3 Get 20 Percent Off",
                    "offer_amount": 20,
                    "quantity": 3
                }

                chai.request(server)
                    .put('/api/offer/'+docId)
                    .send(putData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        done();
                    });
            });

            it('it should not update doc with invalid docId', (done) => {
                
                chai.request(server)
                    .put('/api/offer/Invalide doc id')
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            it('it should not update doc with invalid value', (done) => {
                

                let putData = {
                    "name": "Buy 3 Get 20 Percent Off",
                    "offer_amount": "Invalid",
                    "quantity": 2
                }

                chai.request(server)
                    .put('/api/offer/Invalide doc id')
                    .send(putData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                Offer.remove({}, (err) => { 
                   done();
                });
            });
        
        });

        describe('GET /api/offer', () => {
            before(function(done) {
                let insertData = {
                    "product_id": productId,
                    "name": "Buy 2 Get 50 Percent Off",
                    "type": "DISCOUNT",
                    "code": "PERCENT",
                    "offer_amount": 50,
                    "quantity": 2
                };
                Offer.create(insertData, function(err, doc){
                    if(err){
                        done(err);
                    } else {
                        done();
                    }

                })
            });

            it('it should get doc list', (done) => {
                
                chai.request(server)
                    .get('/api/offer')
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        expect(body.data).to.be.an('array');
                        expect(body.data.length).to.equal(1);
                        done();
                    });
            })

            after((done) => { //Before each test we empty the database
                Offer.remove({}, (err) => { 
                   done();         
                });
            });

        });

        describe('GET /api/offer/offerId', () => {
            var docId ;
            before(function(done) {
                let insertData = {
                    "product_id": productId,
                    "name": "Buy 2 Get 50 Percent Off",
                    "type": "DISCOUNT",
                    "code": "PERCENT",
                    "offer_amount": 50,
                    "quantity": 2
                };
                Offer.create(insertData, function(err, doc){
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
                    .get('/api/offer/'+docId)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        expect(body.data).to.be.an('object');
                        done();
                    });
            });

            it('it should not get doc with invalid Id', (done) => {
                
                chai.request(server)
                    .get('/api/offer/Invalid Id')
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                Offer.remove({}, (err) => { 
                   done();         
                });
            });
        });

        describe('DELETE /api/offer/offerId', () => {
            var docId ;
            before(function(done) {
                let insertData = {
                    "product_id": productId,
                    "name": "Buy 2 Get 50 Percent Off",
                    "type": "DISCOUNT",
                    "code": "PERCENT",
                    "offer_amount": 50,
                    "quantity": 2
                };
                Offer.create(insertData, function(err, doc){
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
                    .delete('/api/offer/'+docId)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        done();
                    });
            });

            it('it should not delete doc with invalid Id', (done) => {
                
                chai.request(server)
                    .delete('/api/offer/Invalid Id')
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                Offer.remove({}, (err) => { 
                   done();         
                });
            });
        })

        after((done)=>{
            Product.remove({}, (err) => {
                if(err){
                    return;
                    done(err);
                }
                done();
            })
        })   

    });
});
