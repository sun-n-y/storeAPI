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

[Back to Top](#custom_anchor_name)
