const authController = require('../controllers/v1/authController');

const express = require('express');

const app = express();

app.post('/login', authController.login);
app.delete('/logout', authController.logout);

module.exports = app;
