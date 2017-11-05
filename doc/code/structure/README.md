# Application directory layout

```
API Test/           # API END TO ENT TEST
   index.js                     # Entry point, imports all api test code
   module.api.test.js           # Module API test file
app/              # NodeJs Application
  backend/            # Server Backend Code
    const/            # Constant for the application
      codes         # Status codes for the application
        messages        # Status message for the application
    controllers/        # Backend controllers
      module.js       # Controller file for a module
    helpers/          # Helper function like date manipulation helper
    models/           # Schemas definations directory
      index.js        # Import all model and export seed function
        collection.js     # Mongo Schema for a collection
    routes.js         # Backend Route of the application
  config/           # Configuration files
    db.json           # Database config file
    server.json         # Server config file
  frontend/           # FrontEnd code
  seed/             # Seed data for the database
    collection.js       # Seed data for the collection
  test              # Unit and Integration test
    integration         # Module Test Files
      module.test.js      # Integration Test for a module
    unit            # Unit Test Files
      unit.test.js      # Unit test for a file or functionality
    index.js          # Import all test files
  app.js            # Main file for runnig the app
  package.json          # All npm packages contain and npm script
   