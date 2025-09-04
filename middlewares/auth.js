const authService = require("../services/v1/authService");

module.exports = {
  auth: async (req, res, next)=>{
    try {
      const user_id = await authService.auth_token(req.headers.auth_token);

      req['user'] = {user_id};

      next();
    } catch (error) {
      next(error);
    }
  },
};
