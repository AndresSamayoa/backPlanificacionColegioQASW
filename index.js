require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { load } = require('./loaders');

async function startup() {
  const app = express();

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cors())

 await load(app);

  app.get('/welcome',(req, res)=> res.status(200).send('Hello World'))

  app.use((error, req, res, next) => {
      if (!error.statusCode) error.statusCode = 500;
    
      return res.status(error.statusCode).send({
        status: false,
        message: error.message,
        data: ''
      });
  });

  app.listen(process.env.EXPRESS_PORT, ()=> console.log('Running on port ' + process.env.EXPRESS_PORT));
}

startup();
