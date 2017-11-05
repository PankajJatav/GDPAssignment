/* * ************************************************************ 
 * Date: 04 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Integration Test file for user routes
 * Typescript file routes.user.test.js
 * *************************************************************** */

let mongoose = require("mongoose");
var Models = require('./../../backend/models');
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
    describe('User:', () => {       

        describe('POST /api/user', () => {

            beforeEach((done) => { //Before each test we empty the database
                User.remove({}, (err) => { 
                   done();         
                });
            });

            it('it should create a new doc', (done) => {

                let postData = {
                    "username": faker.name.findName()
                }

                chai.request(server)
                    .post('/api/user')
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
                }

                chai.request(server)
                    .post('/api/user')
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
                    "username": {key:"!@#$%^&*()"}
                }

                chai.request(server)
                    .post('/api/user')
                    .send(postData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                User.remove({}, (err) => { 
                   done();         
                });
            });

        });

        describe('PUT /api/user/userId', () => {

            before(function(done) {
                let insertData = {
                    "username": faker.name.findName()
                };
                User.create(insertData, function(err, doc){
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
                    "username": faker.name.findName()
                }

                chai.request(server)
                    .put('/api/user/'+docId)
                    .send(putData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        done();
                    });
            });

            it('it should not update doc with invalid docId', (done) => {
                
                chai.request(server)
                    .put('/api/user/Invalide doc id')
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            it('it should not update doc with invalid value', (done) => {
                
                let putData = {
                    username: "!@#$%^&*()"
                }

                chai.request(server)
                    .put('/api/user/Invalide doc id')
                    .send(putData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                User.remove({}, (err) => { 
                   done();
                });
            });
        
        });

        describe('GET /api/user', () => {
            before(function(done) {
                let insertData = {
                    "username": faker.name.findName()
                };
                User.create(insertData, function(err, doc){
                    if(err){
                        done(err);
                    } else {
                        done();
                    }

                })
            });

            it('it should get doc list', (done) => {
                
                chai.request(server)
                    .get('/api/user')
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        expect(body.data).to.be.an('array');
                        expect(body.data.length).to.equal(1);
                        done();
                    });
            })

            after((done) => { //Before each test we empty the database
                User.remove({}, (err) => { 
                   done();         
                });
            });

        });

        describe('GET /api/user/userId', () => {
            var docId ;
            before(function(done) {
                let insertData = {
                    "username": faker.name.findName()
                };
                User.create(insertData, function(err, doc){
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
                    .get('/api/user/'+docId)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        expect(body.data).to.be.an('object');
                        done();
                    });
            });

            it('it should not get doc with invalid Id', (done) => {
                
                chai.request(server)
                    .get('/api/user/Invalid Id')
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                User.remove({}, (err) => { 
                   done();         
                });
            });
        });

        describe('DELETE /api/user/userId', () => {
            var docId ;
            before(function(done) {
                let insertData = {
                    "username": faker.name.findName()
                };
                User.create(insertData, function(err, doc){
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
                    .delete('/api/user/'+docId)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        done();
                    });
            });

            it('it should not delete doc with invalid Id', (done) => {
                
                chai.request(server)
                    .delete('/api/user/Invalid Id')
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        expect(body.error).to.be.an('object');
                        done();
                    });
            });

            after((done) => { //Before each test we empty the database
                User.remove({}, (err) => { 
                   done();         
                });
            });
        })

        describe('POST /api/user/bill', () => {
            before((done)=>{
                Models.seed((err)=>{
                    if(err){
                        done(error);
                        return;
                    } else{
                        done();
                    }
                });
            })
            it("it should give bill", (done) => {
                let postData = {
                    "username": "ford",
                    "products": ["classic", "standout", "premium"]
                }

                chai.request(server)
                    .post('/api/user/bill')
                    .send(postData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(200);
                        expect(body.data).to.be.an('object');
                        done();
                    });
            });

            it("it should not give bill when username is missing", (done) => {
                let postData = {
                    "products": ["classic", "standout", "premium"]
                }

                chai.request(server)
                    .post('/api/user/bill')
                    .send(postData)
                    .end( (err, res) => {
                        let body = res.body;
                        expect(body.code).to.equal(403);
                        done();
                    });
            })
        });
    });
});
