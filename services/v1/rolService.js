const { badRequestError, notFoundError } = require('../../errors');
const { _main: mainDB } = require('../../loaders/postgres');

module.exports = {    
  async create ({usuario_id, tipo}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call pas_create_rol  (:Usuario_id, :Tipo, null, null)',
      {replacements: {Usuario_id: usuario_id, Tipo:tipo}}
    );

    if(!status) throw badRequestError(message)
  },

  async update (id, {tipo}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call pas_update_rol (:Rol_id,  :Tipo, null, null)',
      {replacements: {Rol_id:id, Tipo: tipo|| null}}
    );

    if(!status) throw badRequestError(message)
  },


  async delete (id) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call  pas_delete_rol (:Rol_id, null, null)',
      {replacements: {Rol_id: id}}
    );

    if(!status) throw badRequestError(message)
  },

  async getOne (id) {
    let [data] = await mainDB.query('select * from fas_buscar_roles(:Rol_id);',
      {replacements: {Rol_id: id}}
    );

    if(data.length < 1) throw notFoundError('Rol no encontrado, validar nuevamente dato ingresado');

    return data;
  },
  
  async getOne1 (id) {
    let [data] = await mainDB.query('select * from fas_usuario_roles(:Rol_usuario);',
      {replacements: {Rol_usuario: id}}
    );

    if(data.length < 1) throw notFoundError(' no encontrado, validar nuevamente dato ingresado');

    return data;
  },

  async search (param) {
    let [data] = await mainDB.query('select * from  fas_get_rol(:Param);',
      {replacements: {Param: param}}
    );

    if(data.length < 1) throw notFoundError('rol No Encontrado');

    return data;
  },
}
