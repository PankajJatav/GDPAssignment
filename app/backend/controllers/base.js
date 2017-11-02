'use strict';

/* * ************************************************************ 
 * Date: 01 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Base Class for perform basic operations
 * Typescript file base.js
 * *************************************************************** */

var messages = require("./../consts/messages");
var codes = require("./../consts/codes");

module.exports = class BaseController {
    
    /**
    * This will return all the docs
    * @method getlist
    * @param Object req - request object of app
    * @param Object res - response object of app
    * @return  json object
    */
    getlist(req, res) {
        var moduleName = this.module;
        //Query the DB and if no errors, send all the docs
        let query = this.model.find({});
        query.exec((err, docs) => {
            if(err) {
                res.json({ 
                    code: codes.FOEBIDDEN,
                    message: messages.FOEBIDDEN_ERROR,
                    error: err
                });
                return;
            }
            res.json({
                code: codes.SUCCESS,
                message: messages.FIND,
                data: docs
            });
        });
    }
    
    /**
    * This will create new doc in database
    * @method create
    * @param Object req - request object of app
    * @param Object res - response object of app
    * @return  json object
    */
    create(req, res) {
        //Creates a new doc
        var newDoc = new this.model(req.body);
        //Save it into the DB.
        newDoc.save((err,doc) => {
            if(err) {
                res.json({ 
                    code: codes.FOEBIDDEN,
                    message: messages.FOEBIDDEN_ERROR,
                    error: err
                });
                return;
            }
            
            //If no errors, send it back to the client
            res.json({
                code: codes.CREATED,
                message: messages.CREATE,
                data: doc 
            });
        });
    }

    /**
    * This will return single doc using id
    * @method getById
    * @param Object req - request object of app
    * @param Object res - response object of app
    * @return  json object
    */
    getById(req, res) {
        if(!req.params.id){
            res.json({ 
                code: codes.FOEBIDDEN,
                message: messages.ID_REQUIRED,
                error: err
            });
            return;
        }
        this.model.findById(req.params.id, (err, doc) => {
            if(err) {
                res.json({ 
                    code: codes.FOEBIDDEN,
                    message: messages.FOEBIDDEN_ERROR,
                    error: err
                });
                return;
            }
            //If no errors, send it back to the client
            res.json({
                code: codes.SUCCESS,
                message: messages.FIND,
                data: doc
            });
        }); 
    }

    /**
    * This will delete the doc
    * @method delete
    * @param Object req - request object of app
    * @param Object res - response object of app
    * @return  json object
    */
    delete(req, res) {
        if(!req.params.id){
            res.json({ 
                code: codes.FOEBIDDEN,
                message: messages.ID_REQUIRED,
                error: err
            });
            return;
        }
        this.model.remove({_id : req.params.id}, (err, result) => {
            if(err) {
                res.json({ 
                    code: codes.FOEBIDDEN,
                    message: messages.FOEBIDDEN_ERROR,
                    error: err
                });
                return;
            }

            res.json({ 
                code: codes.SUCCESS,
                message: messages.DELETE,
                data: result
            });
        });
    }

    /**
    * This will update the doc and return updated doc
    * @method update
    * @param Object req - request object of app
    * @param Object res - response object of app
    * @return  json object
    */
    update(req, res) {
        if(!req.params.id) {
            res.json({
                code: codes.FOEBIDDEN,
                message: messages.ID_REQUIRED,
                error: err
            });
            return;
        }
        this.model.findById({_id: req.params.id}, (err, doc) => {
            if(err) {
                res.json({ 
                    code: codes.FOEBIDDEN,
                    message: messages.FOEBIDDEN_ERROR,
                    error: err
                });
                return;
            }
            if(!doc){
                res.json({ 
                    code: codes.NOT_FOUND,
                    message: messages.NOT_FOUND,
                    error: err
                });
                return;
            }
            Object.assign(doc, req.body).save((err, doc) => {
                if(err) res.send(err);

                res.json({
                    code: codes.SUCCESS,
                    message: messages.DELETE,
                    data: doc
                });
            }); 
        });
    }

}
