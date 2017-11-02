var expect  = require('chai').expect;
var request = require('request');
var faker = require("faker");

describe('GET /api/product', () => {
    it('Get Prodct List', function(done) {
        let options = {
            method: 'GET',
            uri: "http://localhost:3000/api/product"
        }
        request(options , function(error, response, body) {
            let info = JSON.parse(body);
            expect(info.code).to.equal(200);
            expect(info.data).to.be.an('array');
            done();
        });
    });

    it('Create New Product', function(done) {
        let postData = {
            method: 'POST',
            uri: "http://localhost:3000/api/product",
            json: {
                "code": faker.random.uuid(6),
                "name": faker.commerce.productName(),
                "price": faker.commerce.price()
            }
        }
        request(postData , function(error, response, body) {
            expect(body.code).to.equal(201);
            expect(body.data).to.be.an('object');
            done();
        });
    });

    it('Create Invalid Product', function(done) {
        let postData = {
            method: 'POST',
            uri: "http://localhost:3000/api/product",
            json: {
                "code": faker.random.uuid(6),
                "price": faker.commerce.price()
            }
        }
        request(postData , function(error, response, body) {
            expect(body.code).to.equal(403);
            expect(body.error).to.be.an('object');
            done();
        });
    });

    it('Update Product', function(done) {
        
        let postData = {
            method: 'POST',
            uri: "http://localhost:3000/api/product",
            json: {
                "code": faker.random.uuid(6),
                "name": faker.commerce.productName(),
                "price": faker.commerce.price()
            }
        }
        request(postData , function(error, response, body) {
            expect(body.code).to.equal(201);
            expect(body.data).to.be.an('object');
            let putData = {
                method: "PUT",
                uri: "http://localhost:3000/api/product/"+body.data._id,
                json: {
                    "code": faker.random.uuid(6),
                    "name": faker.commerce.productName()
                }
            }
            request(putData , function(error, response, updatedbody) {
                expect(updatedbody.code).to.equal(200);
                expect(updatedbody.data).to.be.an('object');
                expect(updatedbody.data.code).to.equal(putData.json.code);
                expect(updatedbody.data.name).to.equal(putData.json.name);
                done();
            });
        });
    });


    it('Update Invalid Product', function(done) {
        
        let postData = {
            method: 'POST',
            uri: "http://localhost:3000/api/product",
            json: {
                "code": faker.random.uuid(6),
                "name": faker.commerce.productName(),
                "price": faker.commerce.price()
            }
        }
        request(postData , function(error, response, body) {
            expect(body.code).to.equal(201);
            expect(body.data).to.be.an('object');
            let putData = {
                method: "PUT",
                uri: "http://localhost:3000/api/product/"+body.data._id + faker.random.uuid(6),
                json: {
                    "code": faker.random.uuid(6),
                    "name": faker.commerce.productName()
                }
            }
            request(putData , function(error, response, updatedbody) {
                expect(updatedbody.code).to.equal(403);
                expect(updatedbody.error).to.be.an('object');
                done();
            });
        });
    });


    it('Delete Product', function(done) {
        let postData = {
            method: 'POST',
            uri: "http://localhost:3000/api/product",
            json: {
                "code": faker.random.uuid(6),
                "name": faker.commerce.productName(),
                "price": faker.commerce.price()
            }
        }
        request(postData , function(error, response, body) {
            expect(body.code).to.equal(201);
            expect(body.data).to.be.an('object');
            let deleteData = {
                method: "DELETE",
                uri: "http://localhost:3000/api/product/"+body.data._id,
            }
            request(deleteData , function(error, response, delBody) {
                let info = JSON.parse(delBody);
                expect(info.code).to.equal(200);
                done();
            });
        });
    });

    it('Delete Invalid Product', function(done) {
        let postData = {
            method: 'POST',
            uri: "http://localhost:3000/api/product",
            json: {
                "code": faker.random.uuid(6),
                "name": faker.commerce.productName(),
                "price": faker.commerce.price()
            }
        }
        request(postData , function(error, response, body) {
            expect(body.code).to.equal(201);
            expect(body.data).to.be.an('object');
            let deleteData = {
                method: "DELETE",
                uri: "http://localhost:3000/api/product/"+body.data._id + faker.commerce.price(),
            }
            request(deleteData , function(error, response, delBody) {
                let info = JSON.parse(delBody);
               expect(info.code).to.equal(403);
                done();
            });
        });
    });

});

