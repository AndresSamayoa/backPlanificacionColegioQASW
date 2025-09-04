const { notFoundError } = require("../../errors");
const { auth_resource_read } = require("../../services/v1/authService");
const usuariosService = require("../../services/v1/usuariosService");

module.exports = {
  create: async (req, res, next)=>{
    try {
      await usuariosService.create(req.body);

      return res.status(200).send({message: 'Creado con exito.'});
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next)=>{
    try {
      await usuariosService.update(req.params.id, req.body);

      return res.status(200).send({message: 'Actualizado con exito'});
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next)=>{
    try {
      await usuariosService.delete(req.params.id);

      return res.status(200).send({message: 'Usuario eliminado'});
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next)=>{
    try {
      let data = await usuariosService.getOne(req.params.id);

      return res.status(200).send(data[0]);
    } catch (error) {
      next(error);
    }
  },

  search: async (req, res, next)=>{
    try {
      let data = await usuariosService.search(req.params.param);

      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
};