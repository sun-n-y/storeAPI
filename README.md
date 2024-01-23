<a name="custom_anchor_name"></a>

# store API :couch_and_lamp: :chair:

## Concepts applied but not limited too

- ### node js
- ### express router
- ### routes and controllers
- ### rest API
- ### mongodb atlas
- ### nosql
- ### mongoose
- ### schema & model
- ### aws cloud database

---

### _goals_

- advanced filtering, sorting, and dynamically populating database
- many search options endpoints

---

### _notes_

- frontend only responsible for http calls, backend does all the heavy lifting
  - server is designed to handle large amounts of data and make computations
  - over 100 items, frontend will be overwhelmed and be slow
  - ready to go endpoints where you only fetch the data

---

### _steps_

- npm i
- require dot env to get access to env variables
- spin up express
  - require it
  - create instance
- import middleware functions
  - error handler = catches all errors, and decide response
  - page not found handler
  - express json = to reade the data passed to server
- create starter route
- app use error handler and page not found after routes
- start function, port with variable
- connect to mongodb
- router setup
  - setup controllers first
  - setup routers
    - import controllers
- express router async errors
  - a package does this for us called, express async errors
  - instead of use try and catch in all controllers or async wrapper
  - import it
  - now, if any controller has an error, we will catch it in our custom error handler
  - require in the app js
- product model
  - need schema for data structure
  - using mongoose
  - create the fields and desired defaults
  - export model
- populate db
  - can create a post route and manually add them or
  - automate it by passing on a list to the database
    - products json
      - list of products
    - populate js
      - we dynamically add the list to database
      - will need another connection
        - connect to db with start fx but instead of listen, we use the model to add all of our product to db
    - check connection w/o nodemon
    - using product model we delete all the old, then create new
    - exit process line
      - node method exit
      - if process is successful we want to terminate process, don't need it to be running
- find all products, using query params
  - req.query
  - instead of passing in req.query in our find. we set up new object, we pull out properties we want from req.query and pass that into our find
  - incase we pass in values that does not match model, cause we might
  - we don't want an empty array because of that
  - mongoDB regex
    - since mongoose sits on top of mongoDB, we can get use mongodb query operators
    - regex provides pattern matching strings in queries
    - we are looking for name property, but instead of looking for entire name, regex looks for pattern
      options i for case insensitive

[Back to Top](#custom_anchor_name)
