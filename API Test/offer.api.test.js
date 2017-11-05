/* * ************************************************************ 
 * Date: 06 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : This will test the offer api end point
 * Typescript file offer.api.test.js
 * *************************************************************** */

var expect  = require('chai').expect;
var request = require('request');
var faker = require("faker");
var ServerURL = "http://localhost:3001/api";
var productId;

describe('GET /api/offer', () => {

    before((done)=>{
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
            done();
        });
    })  

    it('Get Offer List', (done) => {
        let options = {
            method: 'GET',
            uri: ServerURL+"/offer"
        }
        request(options , (error, response, body) => {
            let info = JSON.parse(body);
            expect(info.code).to.equal(200);
            expect(info.data).to.be.an('array');
            done();
        });
    });

    it('Create New Offer', (done) => {
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
            done();
        });
    });

    it('Create Invalid Offer', (done) => {
        let postData = {
            method: 'POST',
            uri: ServerURL+"/offer",
            json: {
                "product_id": productId,
                "name": {key:"Buy 2 Get 50 Percent Off"},
                "type": "DISCOUNT",
                "code": "PERCENT",
                "offer_amount": 50,
                "quantity": 2
            }
        }
        request(postData , (error, response, body) => {
            expect(body.code).to.equal(403);
            expect(body.error).to.be.an('object');
            done();
        });
    });

    it('Update Offer', (done) => {
        
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
            let putData = {
                method: "PUT",
                uri: ServerURL+"/offer/"+body.data._id,
                json: {
                    "name": faker.random.uuid()
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


    it('Update Invalid Offer', (done) => {
        
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
            let putData = {
                method: "PUT",
                uri: ServerURL+"/offer/"+body.data._id + faker.random.uuid(6),
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


    it('Delete Offer', (done) => {
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
            let deleteData = {
                method: "DELETE",
                uri: ServerURL+"/offer/"+body.data._id,
            }
            request(deleteData , (error, response, delBody) => {
                let info = JSON.parse(delBody);
                expect(info.code).to.equal(200);
                done();
            });
        });
    });

    it('Delete Invalid Offer', (done) => {
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
            let deleteData = {
                method: "DELETE",
                uri: ServerURL+"/offer/"+body.data._id + faker.commerce.price(),
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

