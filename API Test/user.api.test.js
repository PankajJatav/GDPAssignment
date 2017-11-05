/* * ************************************************************ 
 * Date: 06 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : This will test the user api end point
 * Typescript file user.api.test.js
 * *************************************************************** */

var expect  = require('chai').expect;
var request = require('request');
var faker = require("faker");
var ServerURL = "http://localhost:3001/api";

describe('GET /api/user', () => {
    it('Get User List', (done) => {
        let options = {
            method: 'GET',
            uri: ServerURL+"/user"
        }
        request(options , (error, response, body) => {
            let info = JSON.parse(body);
            expect(info.code).to.equal(200);
            expect(info.data).to.be.an('array');
            done();
        });
    });

    it('Create New User', (done) => {
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
            done();
        });
    });

    it('Create Invalid User', (done) => {
        let postData = {
            method: 'POST',
            uri: ServerURL+"/user",
            json: {
                "username": {key:"!@#$%^&*()"}
            }
        }
        request(postData , (error, response, body) => {
            expect(body.code).to.equal(403);
            expect(body.error).to.be.an('object');
            done();
        });
    });

    it('Update User', (done) => {
        
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
            let putData = {
                method: "PUT",
                uri: ServerURL+"/user/"+body.data._id,
                json: {
                    "username": faker.name.findName()
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


    it('Update Invalid User', (done) => {
        
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
            let putData = {
                method: "PUT",
                uri: ServerURL+"/user/"+body.data._id + faker.random.uuid(6),
                json: {
                    "username": faker.name.findName()
                }
            }
            request(putData , (error, response, updatedbody) => {
                expect(updatedbody.code).to.equal(403);
                expect(updatedbody.error).to.be.an('object');
                done();
            });
        });
    });


    it('Delete User', (done) => {
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
            let deleteData = {
                method: "DELETE",
                uri: ServerURL+"/user/"+body.data._id,
            }
            request(deleteData , (error, response, delBody) => {
                let info = JSON.parse(delBody);
                expect(info.code).to.equal(200);
                done();
            });
        });
    });

    it('Delete Invalid User', (done) => {
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
            let deleteData = {
                method: "DELETE",
                uri: ServerURL+"/user/"+body.data._id + faker.commerce.price(),
            }
            request(deleteData , (error, response, delBody) => {
                let info = JSON.parse(delBody);
               expect(info.code).to.equal(403);
                done();
            });
        });
    });

    it('Get User Bill', (done) => {
        let postData = {
            method: 'POST',
            uri: ServerURL+"/user/bill",
            json: {
                "username": "ford",
                "products": ["classic", "standout", "premium"]
            }
        }
        request(postData , (error, response, body) => {
            expect(body.code).to.equal(200);
            expect(body.data).to.be.an('object');
            done(); 
        });
    });

    it('Get User Bill Without Username', (done) => {
        let postData = {
            method: 'POST',
            uri: ServerURL+"/user/bill",
            json: {
                "products": ["classic", "standout", "premium"]
            }
        }
        request(postData , (error, response, body) => {
            expect(body.code).to.equal(403);
            done(); 
        });
    });

});

