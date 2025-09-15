const planiService = require("../../services/v1/planiService");

module.exports = {
  
  /*  create: async (req, res, next)=>{
    try {
      await planiService.create(req.body);

      return res.status(200).send({message: 'Creado con exito.'});
    } catch (error) {
      next(error);
    }
  },*/

  update: async (req, res, next)=>{
    try {
      await planiService.update(req.params.id, req.body);

      return res.status(200).send({message: 'Actualizado con exito'});
    } catch (error) {
      next(error);
    }
  },

    delete: async (req, res, next)=>{
    try {
      await planiService.delete(req.params.id, req.params.usuario_id );

      return res.status(200).send({message: ' eliminado correctamente'});
    } catch (error) {
      next(error);
    }
  },

  deletep: async (req, res, next)=>{
    try {
      await planiService.delete(req.params.id, req.params.ptipo,  req.params.pid );

      return res.status(200).send({message: ' eliminado correctamente'});
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next)=>{
    try {
      let data = await planiService.getOne(req.params.id);

      return res.status(200).send(data[0]);
    } catch (error) {
      next(error);
    }
  },

};