require('dotenv').config();
//async errors

const express = require('express');
const notFoundMiddleWare = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();

//middleware
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('<h1>store api</h1><a href="/api/v1/products">products route</a>');
});

//error handling
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connect to db
    app.listen(port, (req, res) => {
      console.log('server listening to port 3000 ....');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
