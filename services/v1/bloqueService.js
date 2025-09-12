const { badRequestError, notFoundError } = require('../../errors');
const { _main: mainDB } = require('../../loaders/postgres');

module.exports = {    
  async create ({fechainicio, fechafin}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_crear_bloque (:Fechainicio, :Fechafin)',
      {replacements: {Fechainicio: fechainicio, Fechafin:fechafin}}
    );

    if(!status) throw badRequestError(message)
  },

  async update (id, {fechainicio, fechafin}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call  p_update_bloque (:Bloqueid, :Fechainicio, :Fechafin)',
      {replacements: {Bloqueid:id, Fechainicio: fechainicio|| null, Fechafin: fechafin || null}}
    );

    if(!status) throw badRequestError(message)
  },


  async delete (id) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_delete_bloque (:Bloqueid)',
      {replacements: {Bloqueid: id}}
    );

    if(!status) throw badRequestError(message)
  },

  async getOne (id) {
    let [data] = await mainDB.query('select * from f_get_bloque(:Cursoid);',
      {replacements: {Cursoid: id}}
    );

    if(data.length < 1) throw notFoundError(' validar nuevamente dato ingresado');

    return data;
  },

  async search (fechainicio, fechafin) {
    let [data] = await mainDB.query('select * from  f_buscar_bloque (:Fechainicio, :Fechafin);',
      {replacements: {Fechainicio: fechainicio, Fechafin: fechafin}}
    );

    if(data.length < 1) throw notFoundError('Bloque No Encontrado');

    return data;
  },
}
