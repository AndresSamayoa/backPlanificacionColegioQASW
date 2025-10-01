const { notAuthorizedError, forbiddenError } = require('../../errors');
const { _main: mainDB } = require('../../loaders/postgres');

module.exports = {
  login: async(user, password) => {
    const [[{p_token: token, p_usuario_id: userId, p_status: status, p_message: message}]] = await mainDB.query('call pas_login(:Pass, :User, null, null, null, null);',
      { replacements: {Pass: password, User: user} }
    );

    if (!status) {
      throw forbiddenError(message)
    }

    return {token, userId};
  },

    auth_token: async(token) => {
    const [[{p_user_id: user_id, p_status: status, p_message: message}]] = await mainDB.query('call pas_validate_sesion(:Token, null, null, null);',
      { replacements: {Token: token} }
    );

    if (!status) {
      throw notAuthorizedError(message)
    }

    return user_id;
  },

  delete_token: async(token) => {
    await mainDB.query('call pas_delete_sesion(:Token);',
      { replacements: {Token: token} }
    );
  },

}