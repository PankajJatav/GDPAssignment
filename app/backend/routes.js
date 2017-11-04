/* * ************************************************************ 
 * Date: 31 Oct, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Perform routing for apis
 * JavaScript file routes.js
 * *************************************************************** */

var productController = require("./controllers/product");
var userController = require("./controllers/user");
var offerController = require("./controllers/offer");
var discountController = require("./controllers/discount");
module.exports = function(app, apiRoutes) {

    /**
      ====================== Product Routes Start =========================== 
    */
        // Route to careate new product    
        apiRoutes.post('/product', function(req, res) {
            productController.create(req, res);
        });

        // Route to fetch all product    
        apiRoutes.get('/product', function(req, res) {
            productController.getlist(req, res);
        });

        // Route to careate new product    
        apiRoutes.put('/product/:id', function(req, res) {
            productController.update(req, res);
        });

        // Route to careate new product    
        apiRoutes.get('/product/:id', function(req, res) {
            productController.getById(req, res);
        });

        // Route to careate new product    
        apiRoutes.delete('/product/:id', function(req, res) {
            productController.delete(req, res);
        });

    /**
      ======================  Product Routes End ============================= 
    */

    /**
      ====================== User Routes Start =========================== 
    */
        // Route to careate new user    
        apiRoutes.post('/user', function(req, res) {
            userController.create(req, res);
        });

        // Route to fetch all user    
        apiRoutes.get('/user', function(req, res) {
            userController.getlist(req, res);
        });

        // Route to careate new user    
        apiRoutes.put('/user/:id', function(req, res) {
            userController.update(req, res);
        });

        // Route to careate new user    
        apiRoutes.get('/user/:id', function(req, res) {
            userController.getById(req, res);
        });

        // Route to careate new user    
        apiRoutes.delete('/user/:id', function(req, res) {
            userController.delete(req, res);
        });

    /**
      ======================  User Routes End ============================= 
    */


    /**
      ====================== Offer Routes Start =========================== 
    */
        // Route to careate new offer    
        apiRoutes.post('/offer', function(req, res) {
            offerController.create(req, res);
        });

        // Route to fetch all offer    
        apiRoutes.get('/offer', function(req, res) {
            offerController.getlist(req, res);
        });

        // Route to careate new offer    
        apiRoutes.put('/offer/:id', function(req, res) {
            offerController.update(req, res);
        });

        // Route to careate new offer    
        apiRoutes.get('/offer/:id', function(req, res) {
            offerController.getById(req, res);
        });

        // Route to careate new offer    
        apiRoutes.delete('/offer/:id', function(req, res) {
            offerController.delete(req, res);
        });

    /**
      ======================  Offer Routes End ============================= 
    */


    /**
      ====================== Discount Routes Start =========================== 
    */
        // Route to careate new discount    
        apiRoutes.post('/discount', function(req, res) {
            discountController.create(req, res);
        });

        // Route to fetch all discount    
        apiRoutes.get('/discount', function(req, res) {
            discountController.getlist(req, res);
        });

        // Route to careate new discount    
        apiRoutes.put('/discount/:id', function(req, res) {
            discountController.update(req, res);
        });

        // Route to careate new discount    
        apiRoutes.get('/discount/:id', function(req, res) {
            discountController.getById(req, res);
        });

        // Route to careate new discount    
        apiRoutes.delete('/discount/:id', function(req, res) {
            discountController.delete(req, res);
        });

    /**
      ======================  Discount Routes End ============================= 
    */


    // route to show a random message (GET http://localhost:3000/api/)
    apiRoutes.get('/', function(req, res) {
        res.json({
            message: 'Welcome to the coolest API on earth!'
        });
    });


    app.use('/api', apiRoutes);

    //all other routes are handled by Angular
    app.get('/*', function(req, res) {
        res.send('Hello! The API is at http://localhost:' + 3001 + '/api');
    });

}