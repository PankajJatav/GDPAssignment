/* * ************************************************************ 
 * Date: 01 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Base Controller for perform basic operations
 * Typescript file base.js
 * *************************************************************** */

function baseController(model) {
    this.model = model;
    console.log(model);
};


/**
* This will return all the docs
* @method getlist
* @param Object req - request object of app
* @param Object res - response object of app
* @return  json object
*/
baseController.prototype.getlist = function(req, res) {
    //Query the DB and if no errors, send all the docs
    let query = this.model.find({});
    query.exec((err, docs) => {
        if(err) res.send(err);
        //If no errors, send them back to the client
        res.json(docs);
    });
}


/**
* This will create new doc in database
* @method create
* @param Object req - request object of app
* @param Object res - response object of app
* @return  json object
*/
baseController.prototype.create = function(req, res) {
    console.log('body',req.body);
    //Creates a new doc
    var newProduct = new this.model(req.body);
    //Save it into the DB.
    newProduct.save((err,doc) => {
        console.log(err, res);
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "Successfully added!", doc });
        }
    });   
}

/**
* This will return single doc using id
* @method getById
* @param Object req - request object of app
* @param Object res - response object of app
* @return  json object
*/
baseController.prototype.getById = function(req, res) {
    this.model.findById(req.params.id, (err, doc) => {
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(doc);
    }); 
}

/**
* This will delete the doc
* @method delete
* @param Object req - request object of app
* @param Object res - response object of app
* @return  json object
*/
baseController.prototype.delete = function(req, res) {
    this.model.remove({_id : req.params.id}, (err, result) => {
        res.json({ message: "Successfully deleted!", result });
    });
}

/**
* This will update the doc and return updated doc
* @method update
* @param Object req - request object of app
* @param Object res - response object of app
* @return  json object
*/
baseController.prototype.update = function(req, res) {
    this.model.findById({_id: req.params.id}, (err, doc) => {
        if(err) res.send(err);
        Object.assign(doc, req.body).save((err, doc) => {
            if(err) res.send(err);
            res.json({ message: 'Updated!', doc });
        }); 
    });
}

module.exports = baseController;