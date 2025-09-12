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

//Azzu
const recursoController = require('../controllers/v1/recursoController');
const gradoController   = require('../controllers/v1/gradoController');
const cursoController = require('../controllers/v1/cursoController');
const bloqueController = require('../controllers/v1/bloqueController');
// const horarioController = require('../controllers/v1/horarioController');
const evaluacionController = require('../controllers/v1/evaluacionController');
// const asignacionController = require('../controllers/v1/asignacionController');
// const rolController = require('../controllers/v1/rolController');
// const planiController = require('../controllers/v1/planiController');

app.post('/recurso', recursoController.create);
app.put('/recurso/:id',  recursoController.update);
app.delete('/recurso/:id',  recursoController.delete);
app.get('/recurso/:id',  recursoController.getOne);
app.get('/recurso/search/:param',  recursoController.search);

//verificar que todo este bien
app.post('/grado', gradoController.create);
app.put('/grado/:id',  gradoController.update);
app.delete('/grado/:id',  gradoController.delete);
app.get('/grado/:id',  gradoController.getOne);
app.get('/grado/search/:param',  gradoController.search);

app.post('/curso', cursoController.create);
app.put('/curso/:id',  cursoController.update);
app.delete('/curso/:id',  cursoController.delete);
app.get('/curso/:id',  cursoController.getOne);
app.get('/curso/search/:param',  cursoController.search);

app.post('/bloque', bloqueController.create);
app.put('/bloque/:id',  bloqueController.update);
app.delete('/bloque/:id',  bloqueController.delete);
app.get('/bloque/:id',  bloqueController.getOne);
app.get('/bloque/search/:param',  bloqueController.search);

/*app.post('/horario', horarioController.create);
app.put('/horario/:id',  horarioController.update);
app.delete('/horario/:id',  horarioController.delete);
app.get('/horario/:id',  horarioController.getOne);
app.get('/horario/search/:param',  horarioController.search);*/

app.post('/evaluacion', evaluacionController.create);
app.put('/evaluacion/:id',  evaluacionController.update);
app.delete('/evaluacion/:id',  evaluacionController.delete);
app.get('/evaluacion/:id',  evaluacionController.getOne);
app.get('/evaluacion/search/:param',  evaluacionController.search);

/*app.post('/asignacion', asignacionController.create);
app.put('/asignacion/:id',  asignacionController.update);
app.delete('/asignacion/:id',  asignacionController.delete);
app.get('/asignacion/:id',  asignacionController.getOne);
app.get('/asignacion/search/:param',  asignacionController.search);

app.post('/rol', rolController.create);
app.put('/rol/:id',  rolController.update);
app.delete('/rol/:id',  rolController.delete);
app.get('/rol/:id',  rolController.getOne);
app.get('/rol/search/:param',  rolController.search);

app.post('/planificacion', planiController.create);
app.put('/planificacion/:id',  planiController.update);
app.delete('/planificacion/:id',  planiController.delete);
app.get('/planificacion/:id',  planiController.getOne);
app.get('/planificacion/search/:param',  planiController.search);*/

module.exports = app;
