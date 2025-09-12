const recursoService = require("../../services/v1/recursoService");

module.exports = {
  create: async (req, res, next)=>{
    try {
      await recursoService.create(req.body);

      return res.status(200).send({message: 'Creado con exito.'});
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next)=>{
    try {
      await recursoService.update(req.params.id, req.body);

      return res.status(200).send({message: 'Actualizado con exito'});
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next)=>{
    try {
      await recursoService.delete(req.params.id);

      return res.status(200).send({message: 'Recurso eliminado correctamente'});
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next)=>{
    try {
      let data = await recursoService.getOne(req.params.id);

      return res.status(200).send(data[0]);
    } catch (error) {
      next(error);
    }
  },

  search: async (req, res, next)=>{
    try {
      let data = await recursoService.search(req.params.param);

      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
};