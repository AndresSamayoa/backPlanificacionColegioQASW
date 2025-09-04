const authService = require("../../services/v1/authService");

module.exports = {
  login: async (req, res, next)=>{
    try {
      const hash = await authService.login(req.body.user, req.body.password);

      return res.status(200).send(hash);
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next)=>{
    try {
      await authService.delete_token(req.headers.auth_token);

      return res.status(200).send({message: 'Sesion cerrada'});
    } catch (error) {
      next(error);
    }
  }
};