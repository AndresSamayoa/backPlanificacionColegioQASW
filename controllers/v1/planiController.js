const planiService = require("../../services/v1/planiService");

module.exports = {
  
  create: async (req, res, next)=>{
    try {
      await planiService.create(req.body);

      return res.status(200).send({message: 'Creado con exito.'});
    } catch (error) {
      next(error);
    }
  },

planAprobar: async (req, res, next)=>{
    try {
      await planiService.planAprobar(req.params.id, req.body);

      return res.status(200).send({message: 'aprobado con exito.'});
    } catch (error) {
      next(error);
    }
  },

planrechazar: async (req, res, next)=>{
    try {
      await planiService.planrechazar(req.params.id, req.body);

      return res.status(200).send({message: 'Rechazado.'});
    } catch (error) {
      next(error);
    }
  },

  planagregardetalle: async (req, res, next)=>{
    try {
      await planiService.planagregardetalle(req.params.id, req.body);

      return res.status(200).send({message: 'Agregado correctamente .'});
    } catch (error) {
      next(error);
    }
  },


  
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
      await planiService.delete(req.params.id);

      return res.status(200).send({message: ' eliminado correctamente'});
    } catch (error) {
      next(error);
    }
  },

  deletepla: async (req, res, next)=>{
    try {
      await planiService.deletep(req.params.id, req.body );

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

  getDay: async (req, res, next)=>{
    try {
      let data = await planiService.getDay(req.params.param);

      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  },

};