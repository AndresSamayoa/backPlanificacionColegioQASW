const authController = require('../controllers/v1/authController');
const usuariosController = require('../controllers/v1/usuariosController');

const { auth } = require('../middlewares/auth');

const express = require('express');

const app = express();

app.post('/login', authController.login);
app.delete('/logout', authController.logout);

app.post('/users', auth, usuariosController.create);
app.put('/users/:id', auth, usuariosController.update);
app.delete('/users/:id', auth, usuariosController.delete);
app.get('/users/:id', auth, usuariosController.getOne);
app.get('/users/search/:param', auth, usuariosController.search);

module.exports = app;
