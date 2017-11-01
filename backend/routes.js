/* * ************************************************************ 
 * Date: 31 Oct, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Perform routing for apis
 * JavaScript file routes.js
 * *************************************************************** */

var productController = require("./controllers/product");
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