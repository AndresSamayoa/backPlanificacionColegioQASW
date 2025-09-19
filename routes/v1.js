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
app.get('/users/search/:param', auth, usuariosController.search);
app.get('/users/:id', auth, usuariosController.getOne);

//Azzu
const recursoController = require('../controllers/v1/recursoController');
const gradoController   = require('../controllers/v1/gradoController');
const cursoController = require('../controllers/v1/cursoController');
const bloqueController = require('../controllers/v1/bloqueController');
const evaluacionController = require('../controllers/v1/evaluacionController');

const rolController = require('../controllers/v1/rolController'); 
const horarioController = require('../controllers/v1/horarioController');
const asignacionController = require('../controllers/v1/asignacionController');
const planiController = require('../controllers/v1/planiController');

app.post('/recurso',auth, recursoController.create);
app.put('/recurso/:id',auth,  recursoController.update);
app.delete('/recurso/:id',auth,  recursoController.delete);
app.get('/recurso/search/:param',auth,  recursoController.search);
app.get('/recurso/:id',auth,  recursoController.getOne);

//verificar que todo este bien
app.post('/grado',auth, gradoController.create);
app.put('/grado/:id', auth, gradoController.update);
app.delete('/grado/:id',auth,  gradoController.delete);
app.get('/grado/search/:param',auth,  gradoController.search);
app.get('/grado/:id',auth,  gradoController.getOne);

app.post('/curso',auth, cursoController.create);
app.put('/curso/:id', auth, cursoController.update);
app.delete('/curso/:id',auth,  cursoController.delete);
app.get('/curso/search/:param',auth,  cursoController.search);
app.get('/curso/:id',auth,  cursoController.getOne);

app.post('/bloque',auth, bloqueController.create);
app.put('/bloque/:id', auth, bloqueController.update);
app.delete('/bloque/:id',auth,  bloqueController.delete);
app.get('/bloque/search',auth,  bloqueController.search);
app.get('/bloque/:id',auth,  bloqueController.getOne);

app.post('/evaluacion',auth, evaluacionController.create);
app.put('/evaluacion/:id',auth,  evaluacionController.update);
app.delete('/evaluacion/:id',auth,  evaluacionController.delete);
app.get('/evaluacion/search/:param',auth,  evaluacionController.search);
app.get('/evaluacion/:id',auth,  evaluacionController.getOne);

app.post('/rol',auth, rolController.create);
app.put('/rol/:id',auth,  rolController.update);
app.delete('/rol/:id', auth, rolController.delete);
app.get('/rol/:id', auth, rolController.getOne);
app.get('/rol/search/:param', auth, rolController.search);
app.get('/rol/:id',auth,  rolController.getOne1);

app.post('/horario',auth, horarioController.create);
app.put('/horario/:id', auth, horarioController.update);
app.delete('/horario/:id',auth,  horarioController.delete);
app.get('/horario/search/:param',auth,  horarioController.search);
app.get('/horario/:id',auth,  horarioController.getOne);

app.post('/asignacion',auth, asignacionController.create);
app.put('/asignacion/:id',auth,  asignacionController.update);
app.delete('/asignacion/:id', auth, asignacionController.delete);
app.get('/asignacion/search/:param',auth,  asignacionController.search);
app.get('/asignacion/:id', auth, asignacionController.getOne);


app.post('/planificacion', auth, planiController.create);
app.post('/planificacion/aprobar/:id', auth, planiController.planAprobar);
app.post('/planificacion/rechazar/:id', auth, planiController.planrechazar);
app.post('/planificacion/:id/detalle', auth, planiController.planagregardetalle);
app.put('/planificacion/:id', auth, planiController.update);
app.delete('/planificacion/:id',auth,  planiController.delete);
app.delete('/planificacion/:id/detalle',auth, planiController.deleteplanidetalle);
app.get('/planificacion/day/:param',auth,  planiController.getDay);
app.get('/planificacion/:id',auth,  planiController.getOne);

module.exports = app;