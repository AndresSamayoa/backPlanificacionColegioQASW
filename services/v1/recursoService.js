const { badRequestError, notFoundError } = require('../../errors');
const { _main: mainDB } = require('../../loaders/postgres');

module.exports = {    
  async create ({recursonombre}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_crear_recurso (:Recursonombre)',
      {replacements: {Recursonombre: recursonombre}}
    );

    if(!status) throw badRequestError(message)
  },

  async update (id, {recursonombre}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_update_recurso (:Idrecurso, :Recursonombre)',
      {replacements: {Idrecurso: id, Recursonombre: recursonombre || null}}
    );

    if(!status) throw badRequestError(message)
  },


  async delete (id) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_delete_recurso (:Idrecurso)',
      {replacements: {Idrecurso: id}}
    );

    if(!status) throw badRequestError(message)
  },

  async getOne (id) {
    let [data] = await mainDB.query('select * from f_get_recurso(:Idrecurso);',
      {replacements: {Idrecurso: id}}
    );

    if(data.length < 1) throw notFoundError('No se encuentra el recurso, validar nombre nuevamente');

    return data;
  },

  async search (param) {
    let [data] = await mainDB.query('select * from f_buscar_recursos(:Param);',
      {replacements: {Param: param}}
    );

    if(data.length < 1) throw notFoundError('Recurso No Encontrado');

    return data;
  },
}
