/* * ************************************************************ 
 * Date: 04 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Integration Test file for discount API
 * Typescript file routes.discount.test.js
 * *************************************************************** */

let mongoose = require("mongoose");
let Discount = require('./../../backend/models/discount');
let Offer = require('./../../backend/models/offer');
let Product = require('./../../backend/models/product');
let User = require('./../../backend/models/user');
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
    describe('Discount:', () => {       

        var userId;
        var offerId;

        before((done)=> {
            var productId;

            new Promise(function(resolve, reject) {
                let productData = {
                    "code": faker.random.uuid(6),
                    "name": faker.commerce.productName(),
                    "price": faker.commerce.price()
                };
                Product.create(productData, (err, doc) => {
                    if(err){
                        reject(err)
                        return;
                    }
                    productId = doc._id;
                    resolve();
                })
            }).then(function(result) {
                return new Promise(function(resolve, reject) {
                    let OfferData = {
                        "product_id": productId,
                        "name": "Buy 2 Get 50 Percent Off 2",
                        "type": "DISCOUNT",
                        "code": "PERCENT",
                        "offer_amount": 50,
                        "quantity": 2
                    };
                    Offer.create(OfferData, (err, doc) => {
                        if(err){
                            reject(err)
                            return;
                        }
                        offerId = doc._id;
                        resolve();
                    })
                });
            }).then(function(result) {
                return new Promise((resolve, reject) => { 
                    let userData = {
                        "username": faker.name.findName()
                    };
                    User.create(userData, (err, doc) => {
                        if(err){
                            reject(err);
                            return;
                        }
                        userId = doc._id;
                        resolve();
                    });
                });
            }).then(function(result) {
                done();
            }).catch(function(error){
                done(error);
            });
            
        });

        describe('POST /api/discount', () => {

            beforeEach((done) => { //Before each test we empty the database
                Discount.remove({}, (err) => { 
                   done();         
                });
            });

            it('it should create a new doc', (done) => {

                let postData = {
                    "user_id": userId,
                    "offer_id": offerId,
                    "expiry_date": new Date(),
                    "is_expire": true,
                    "is_active": true
                };

                chai.request(server)
                    .post('/api/discount')
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
                    "name": "Buy 2 Get 50 Percent Off",
                    "type": "DISCOUNT",
                    "code": "PERCENT",
                }

                chai.request(server)
                    .post('/api/discount')
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
                    "name": "Buy 2 Get 50 Percent Off",
                    "type": "DISCOUNT",
                    "code": "PERCENT",
                    "discount_amount": "Invalid",
                    "quantity": 2
                }

                chai.request(server)
                    .post('/api/discount')
                    .send(postData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                Discount.remove({}, (err) => { 
                   done();         
                });
            });

        });

        describe('PUT /api/discount/discountId', () => {

            before( (done) => {
                let insertData = {
                    "user_id": userId,
                    "offer_id": offerId,
                    "expiry_date": new Date(),
                    "is_expire": true,
                    "is_active": true
                };
                Discount.create(insertData, (err, doc) => {
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
                    "is_expire": false,
                    "is_active": false
                }

                chai.request(server)
                    .put('/api/discount/'+docId)
                    .send(putData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        done();
                    });
            });

            it('it should not update doc with invalid docId', (done) => {
                
                chai.request(server)
                    .put('/api/discount/Invalide doc id')
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
                    "discount_amount": "Invalid",
                    "quantity": 2
                }

                chai.request(server)
                    .put('/api/discount/Invalide doc id')
                    .send(putData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                Discount.remove({}, (err) => { 
                   done();
                });
            });
        
        });

        describe('GET /api/discount', () => {
            before((done) => {
                let insertData = {
                    "user_id": userId,
                    "offer_id": offerId,
                    "expiry_date": new Date(),
                    "is_expire": true,
                    "is_active": true
                };
                Discount.create(insertData, (err, doc) => {
                    if(err){
                        done(err);
                    } else {
                        done();
                    }

                })
            });

            it('it should get doc list', (done) => {
                
                chai.request(server)
                    .get('/api/discount')
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        expect(body.data).to.be.an('array');
                        expect(body.data.length).to.equal(1);
                        done();
                    });
            })

            after((done) => { //Before each test we empty the database
                Discount.remove({}, (err) => { 
                   done();         
                });
            });

        });

        describe('GET /api/discount/discountId', () => {
            var docId ;
            before((done) => {
                let insertData = {
                    "user_id": userId,
                    "offer_id": offerId,
                    "expiry_date": new Date(),
                    "is_expire": true,
                    "is_active": true
                };
                Discount.create(insertData, (err, doc) => {
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
                    .get('/api/discount/'+docId)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        expect(body.data).to.be.an('object');
                        done();
                    });
            });

            it('it should not get doc with invalid Id', (done) => {
                
                chai.request(server)
                    .get('/api/discount/Invalid Id')
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                Discount.remove({}, (err) => { 
                   done();         
                });
            });
        });

        describe('DELETE /api/discount/discountId', () => {
            var docId ;
            before( (done) => {
                let insertData = {
                    "user_id": userId,
                    "offer_id": offerId,
                    "expiry_date": new Date(),
                    "is_expire": true,
                    "is_active": true
                };
                Discount.create(insertData, (err, doc) => {
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
                    .delete('/api/discount/'+docId)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        done();
                    });
            });

            it('it should not delete doc with invalid Id', (done) => {
                
                chai.request(server)
                    .delete('/api/discount/Invalid Id')
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                Discount.remove({}, (err) => { 
                   done();         
                });
            });
        });

        after((done) => {
            User.remove({}, (err) => { 
                if(err){
                    done(err);
                }
            });
            Product.remove({}, err => {
                if(err){
                    done(err);
                }
            })
            Offer.remove({}, (err) => { 
               done();         
            });
        });

    });
});
