const { badRequestError, notFoundError } = require('../../errors');
const { _main: mainDB } = require('../../loaders/postgres');

module.exports = {    
  async create ({nombrecurso, gradoid}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_crear_curso (:Nombrecurso, :Gradoid, null, null)',
      {replacements: {Nombrecurso: nombrecurso, Gradoid:gradoid}}
    );

    if(!status) throw badRequestError(message)
  },

  async update (id, {nombrecurso, gradoid}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_update_grado (:Cursoid, :Nombrecurso, :Gradoid, null, null)',
      {replacements: {Cursoid:id, Nombrecurso: nombrecurso|| null, Gradoid: gradoid || null}}
    );

    if(!status) throw badRequestError(message)
  },


  async delete (id) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_delete_curso (:Cursoid, null, null)',
      {replacements: {Cursoid: id}}
    );

    if(!status) throw badRequestError(message)
  },

  async getOne (id) {
    let [data] = await mainDB.query('select * from f_get_curso(:Cursoid);',
      {replacements: {Cursoid: id}}
    );

    if(data.length < 1) throw notFoundError('Curso no encontrado, validar nuevamente dato ingresado');

    return data;
  },

  async getOne1 (id) {
    let [data] = await mainDB.query('select * from f_get_curso_grado(:Cursogrado);',
      {replacements: {Cursogrado: id}}
    );

    if(data.length < 1) throw notFoundError('validar nuevamente dato ingresado');

    return data;
  },

  async search (param) {
    let [data] = await mainDB.query('select * from  f_buscar_curso(:Param);',
      {replacements: {Param: param}}
    );

    if(data.length < 1) throw notFoundError('Curso No Encontrado');

    return data;
  },
}
