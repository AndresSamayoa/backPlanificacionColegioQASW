const express = require('express');

const v1 = require('./v1');

const app = express();

app.use('/api/v1', v1);

module.exports = app;
