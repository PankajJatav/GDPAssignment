/* * ************************************************************ 
 * Date: 06 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : This will test the discount api end point
 * Typescript file discount.api.test.js
 * *************************************************************** */

var expect  = require('chai').expect;
var request = require('request');
var faker = require("faker");
var ServerURL = "http://localhost:3001/api";
var productId;
var userId;
var offerId;

describe('GET /api/discount', () => {

    before((done)=> {
        new Promise(function(resolve, reject) {
            let postData = {
                method: 'POST',
                uri: ServerURL+"/product",
                json: {
                    "code": faker.random.uuid(6),
                    "name": faker.commerce.productName(),
                    "price": faker.commerce.price()
                }
            }
            request(postData , (error, response, body) => {
                expect(body.code).to.equal(201);
                expect(body.data).to.be.an('object');
                productId = body.data._id;
                resolve();
            });
        }).then(function(result) {
            return new Promise(function(resolve, reject) {
                let postData = {
                    method: 'POST',
                    uri: ServerURL+"/offer",
                    json: {
                        "product_id": productId,
                        "name": faker.random.uuid(),
                        "type": "DISCOUNT",
                        "code": "PERCENT",
                        "offer_amount": 50,
                        "quantity": 2
                    }
                }
                request(postData , (error, response, body) => {
                    expect(body.code).to.equal(201);
                    expect(body.data).to.be.an('object');
                    offerId = body.data._id;
                    resolve();
                });
            });
        }).then(function(result) {
            return new Promise((resolve, reject) => { 
                let postData = {
                    method: 'POST',
                    uri: ServerURL+"/user",
                    json: {
                        "username": faker.name.findName()
                    }
                }
                request(postData , (error, response, body) => {
                    expect(body.code).to.equal(201);
                    expect(body.data).to.be.an('object');
                    userId = body.data._id;
                    resolve();
                });
            });
        }).then(function(result) {
            done();
        }).catch(function(error){
            done(error);
        });
    });

    it('Get Discount List', (done) => {
        let options = {
            method: 'GET',
            uri: ServerURL+"/discount"
        }
        request(options , (error, response, body) => {
            let info = JSON.parse(body);
            expect(info.code).to.equal(200);
            expect(info.data).to.be.an('array');
            done();
        });
    });

    it('Create New Discount', (done) => {
        let postData = {
            method: 'POST',
            uri: ServerURL+"/discount",
            json: {
                "user_id": userId,
                "offer_id": offerId,
                "expiry_date": new Date(),
                "is_expire": true,
                "is_active": true
            }
        }
        request(postData , (error, response, body) => {
            expect(body.code).to.equal(201);
            expect(body.data).to.be.an('object');
            done();
        });
    });

    it('Create Invalid Discount', (done) => {
        let postData = {
            method: 'POST',
            uri: ServerURL+"/discount",
            json: {
                "user_id": "userId",
                "offer_id": offerId,
                "expiry_date": new Date(),
                "is_expire": true,
                "is_active": true
            }
        }
        request(postData , (error, response, body) => {
            expect(body.code).to.equal(403);
            expect(body.error).to.be.an('object');
            done();
        });
    });

    it('Update Discount', (done) => {
        
        let postData = {
            method: 'POST',
            uri: ServerURL+"/discount",
            json: {
                "user_id": userId,
                "offer_id": offerId,
                "expiry_date": new Date(),
                "is_expire": true,
                "is_active": true
            }
        }
        request(postData , (error, response, body) => {
            expect(body.code).to.equal(201);
            expect(body.data).to.be.an('object');
            let putData = {
                method: "PUT",
                uri: ServerURL+"/discount/"+body.data._id,
                json: {
                    "expiry_date": new Date(),
                }
            }
            request(putData , (error, response, updatedbody) => {
                expect(updatedbody.code).to.equal(200);
                expect(updatedbody.data).to.be.an('object');
                expect(updatedbody.data.name).to.equal(putData.json.name);
                done();
            });
        });
    });


    it('Update Invalid Discount', (done) => {
        
        let postData = {
            method: 'POST',
            uri: ServerURL+"/discount",
            json: {
                "user_id": userId,
                "offer_id": offerId,
                "expiry_date": new Date(),
                "is_expire": true,
                "is_active": true
            }
        }
        request(postData , (error, response, body) => {
            expect(body.code).to.equal(201);
            expect(body.data).to.be.an('object');
            let putData = {
                method: "PUT",
                uri: ServerURL+"/discount/"+body.data._id + faker.random.uuid(6),
                json: {
                    "name": faker.random.uuid()
                }
            }
            request(putData , (error, response, updatedbody) => {
                expect(updatedbody.code).to.equal(403);
                expect(updatedbody.error).to.be.an('object');
                done();
            });
        });
    });


    it('Delete Discount', (done) => {
        let postData = {
            method: 'POST',
            uri: ServerURL+"/discount",
            json: {
                "user_id": userId,
                "offer_id": offerId,
                "expiry_date": new Date(),
                "is_expire": true,
                "is_active": true
            }
        }
        request(postData , (error, response, body) => {
            expect(body.code).to.equal(201);
            expect(body.data).to.be.an('object');
            let deleteData = {
                method: "DELETE",
                uri: ServerURL+"/discount/"+body.data._id,
            }
            request(deleteData , (error, response, delBody) => {
                let info = JSON.parse(delBody);
                expect(info.code).to.equal(200);
                done();
            });
        });
    });

    it('Delete Invalid Discount', (done) => {
        let postData = {
            method: 'POST',
            uri: ServerURL+"/discount",
            json: {
                "user_id": userId,
                "offer_id": offerId,
                "expiry_date": new Date(),
                "is_expire": true,
                "is_active": true
            }
        }
        request(postData , (error, response, body) => {
            expect(body.code).to.equal(201);
            expect(body.data).to.be.an('object');
            let deleteData = {
                method: "DELETE",
                uri: ServerURL+"/discount/"+body.data._id + faker.commerce.price(),
            }
            request(deleteData , (error, response, delBody) => {
                let info = JSON.parse(delBody);
               expect(info.code).to.equal(403);
                done();
            });
        });
    });

    after((done)=>{
        let deleteData = {
            method: "DELETE",
            uri: ServerURL+"/product/"+ productId
        }
        request(deleteData , (error, response, delBody) => {
            let info = JSON.parse(delBody);
            expect(info.code).to.equal(200);
            done();
        });
    })  

});

