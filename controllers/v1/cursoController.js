const cursoService = require("../../services/v1/cursoService");

module.exports = {
  create: async (req, res, next)=>{
    try {
      await cursoService.create(req.body);

      return res.status(200).send({message: 'Creado con exito.'});
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next)=>{
    try {
      await cursoService.update(req.params.id, req.body);

      return res.status(200).send({message: 'Actualizado con exito'});
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next)=>{
    try {
      await cursoService.delete(req.params.id);

      return res.status(200).send({message: 'Grado eliminado correctamente'});
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next)=>{
    try {
      let data = await cursoService.getOne(req.params.id);

      return res.status(200).send(data[0]);
    } catch (error) {
      next(error);
    }
  },
   getOne1: async (req, res, next)=>{
    try {
      let data = await cursoService.getOne1(req.params.id);

      return res.status(200).send(data[0]);
    } catch (error) {
      next(error);
    }
  },

  search: async (req, res, next)=>{
    try {
      let data = await cursoService.search(req.params.param);

      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
};