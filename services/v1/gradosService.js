const { badRequestError, notFoundError } = require('../../errors');
const { _main: mainDB } = require('../../loaders/postgres');

module.exports = {    
  async create ({gradonombre}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_crear_grados (:Gradonombre)',
      {replacements: {Gradonombre: gradonombre}}
    );

    if(!status) throw badRequestError(message)
  },

  async update (id, {gradonombre}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_update_grado (:Idgrado, :Gradonombre)',
      {replacements: {Idgrado: id, Gradonombre: gradonombre || null}}
    );

    if(!status) throw badRequestError(message)
  },


  async delete (id) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_delete_grado (:Idgrado)',
      {replacements: {Idgrado: id}}
    );

    if(!status) throw badRequestError(message)
  },

  async getOne (id) {
    let [data] = await mainDB.query('select * from f_get_grado(:Idgrado);',
      {replacements: {Idgrado: id}}
    );

    if(data.length < 1) throw notFoundError('Grado no encontrado');

    return data;
  },

  async search (param) {
    let [data] = await mainDB.query('select * from f_buscar_grado(:Param);',
      {replacements: {Param: param}}
    );

    if(data.length < 1) throw notFoundError('Grado No Encontrado');

    return data;
  },
}
