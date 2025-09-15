const { badRequestError, notFoundError } = require('../../errors');
const { _main: mainDB } = require('../../loaders/postgres');

module.exports = {    
  async create ({usuario_id, grado_id}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_crear_asignacion (:Usuario_id, :Grado_id,null, null)',
      {replacements: {Usuario_id: usuario_id, Grado_id: grado_id}}
    );

    if(!status) throw badRequestError(message)
  },

  async update (id, {usuario_id , grado_id}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_update_asignacion (:Idasignacion, :Usuario_id, :Grado_id, null, null)',
      {replacements: {Idasignacion: id, Usuario_id: usuario_id, Grado_id: grado_id || null}}
    );

    if(!status) throw badRequestError(message)
  },


  async delete (asignacion_id) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_delete_asignacion (:Asignacion_id, null, null)',
      {replacements: {Asignacion_id: asignacion_id}}
    );

    if(!status) throw badRequestError(message)
  },

  async getOne (asignacion_id) {
    let [data] = await mainDB.query('select * from f_get_asignacion(:Asignacion_id);',
      {replacements: {Asignacion_id: asignacion_id}}
    );

    if(data.length < 1) throw notFoundError(' no encontrado');

    return data;
  },

  async search (param) {
    let [data] = await mainDB.query('select * from f_buscar_asignacion(:Param);',
      {replacements: {Param: param}}
    );

    if(data.length < 1) throw notFoundError(' No Encontrado');

    return data;
  },
}
