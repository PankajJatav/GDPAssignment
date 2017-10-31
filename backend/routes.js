/* * ************************************************************ 
 * Date: 31 Oct, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Perform routing for apis
 * JavaScript file routes.js
 * *************************************************************** */


module.exports = function(app, apiRoutes) {

    /**
      ====================== User Routes Start =========================== 
    */
        

    /**
      ======================  User Routes End ============================= 
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