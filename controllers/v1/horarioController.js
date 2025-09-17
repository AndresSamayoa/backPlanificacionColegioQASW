const horarioService = require("../../services/v1/horarioService");

module.exports = {
  create: async (req, res, next)=>{
    try {
      await horarioService.create(req.body);

      return res.status(200).send({message: 'Creado con exito.'});
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next)=>{
    try {
      await horarioService.update(req.params.id, req.body);

      return res.status(200).send({message: 'Actualizado con exito'});
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next)=>{
    try {
      await horarioService.delete(req.params.id);

      return res.status(200).send({message: ' eliminado correctamente'});
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next)=>{
    try {
      let data = await horarioService.getOne(req.params.id, req.query.fecha_inicio, req.query.fecha_fin);

      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  },

  search: async (req, res, next)=>{
    try {
      let data = await horarioService.search(req.params.param, req.query.fecha_inicio, req.query.fecha_fin);

      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
};