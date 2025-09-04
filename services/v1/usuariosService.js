const { badRequestError, notFoundError } = require('../../errors');
const { _main: mainDB } = require('../../loaders/postgres');

module.exports = {
  async create ({names, phone, user, password, admin, active}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call pas_crear_usuario (:Names, :Phone, :User, :Password, :Admin, :Active, null, null)',
      {replacements: {Names: names, Phone: phone, User: user, Password: password, Admin: admin, Active: active}}
    );

    if(!status) throw badRequestError(message)
  },

  async update (id, {names, phone, user, password, admin, active}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call pas_update_usuario (:Id, :Names, :Phone, :User, :Password, :Admin, :Active, null, null)',
      {replacements: {Id: id, Names: names || null, Phone: phone || null, User: user || null, Password: password || null, Admin: admin, Active: active}}
    );

    if(!status) throw badRequestError(message)
  },

  async delete (id) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call pas_delete_usuario (:Id, null, null)',
      {replacements: {Id: id}}
    );

    if(!status) throw badRequestError(message)
  },

  async getOne (id) {
    let [data] = await mainDB.query('select * from fas_get_usuario(:Id);',
      {replacements: {Id: id}}
    );

    if(data.length < 1) throw notFoundError('No se encontro al usuario');

    return data;
  },

  async search (param) {
    let [data] = await mainDB.query('select * from fas_search_usuario(:Param);',
      {replacements: {Param: param}}
    );

    if(data.length < 1) throw notFoundError('No se encontraron usuarios');

    return data;
  },
}
