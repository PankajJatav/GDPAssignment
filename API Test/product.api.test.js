/* * ************************************************************ 
 * Date: 02 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : This will test the product api end point
 * Typescript file product.api.test.js
 * *************************************************************** */

var expect  = require('chai').expect;
var request = require('request');
var faker = require("faker");
var ServerURL = "http://localhost:3001/api";

describe('GET /api/product', () => {
    it('Get Product List', (done) => {
        let options = {
            method: 'GET',
            uri: ServerURL+"/product"
        }
        request(options , (error, response, body) => {
            let info = JSON.parse(body);
            expect(info.code).to.equal(200);
            expect(info.data).to.be.an('array');
            done();
        });
    });

    it('Create New Product', (done) => {
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
            done();
        });
    });

    it('Create Invalid Product', (done) => {
        let postData = {
            method: 'POST',
            uri: ServerURL+"/product",
            json: {
                "code": faker.random.uuid(6),
                "price": faker.commerce.price()
            }
        }
        request(postData , (error, response, body) => {
            expect(body.code).to.equal(403);
            expect(body.error).to.be.an('object');
            done();
        });
    });

    it('Update Product', (done) => {
        
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
            let putData = {
                method: "PUT",
                uri: ServerURL+"/product/"+body.data._id,
                json: {
                    "code": faker.random.uuid(6),
                    "name": faker.commerce.productName()
                }
            }
            request(putData , (error, response, updatedbody) => {
                expect(updatedbody.code).to.equal(200);
                expect(updatedbody.data).to.be.an('object');
                expect(updatedbody.data.code).to.equal(putData.json.code);
                expect(updatedbody.data.name).to.equal(putData.json.name);
                done();
            });
        });
    });


    it('Update Invalid Product', (done) => {
        
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
            let putData = {
                method: "PUT",
                uri: ServerURL+"/product/"+body.data._id + faker.random.uuid(6),
                json: {
                    "code": faker.random.uuid(6),
                    "name": faker.commerce.productName()
                }
            }
            request(putData , (error, response, updatedbody) => {
                expect(updatedbody.code).to.equal(403);
                expect(updatedbody.error).to.be.an('object');
                done();
            });
        });
    });


    it('Delete Product', (done) => {
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
            let deleteData = {
                method: "DELETE",
                uri: ServerURL+"/product/"+body.data._id,
            }
            request(deleteData , (error, response, delBody) => {
                let info = JSON.parse(delBody);
                expect(info.code).to.equal(200);
                done();
            });
        });
    });

    it('Delete Invalid Product', (done) => {
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
            let deleteData = {
                method: "DELETE",
                uri: ServerURL+"/product/"+body.data._id + faker.commerce.price(),
            }
            request(deleteData , (error, response, delBody) => {
                let info = JSON.parse(delBody);
               expect(info.code).to.equal(403);
                done();
            });
        });
    });

});

