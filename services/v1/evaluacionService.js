const { badRequestError, notFoundError } = require('../../errors');
const { _main: mainDB } = require('../../loaders/postgres');

module.exports = {    
  async create ({nombreevaluacion}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_crear_evaluaciones (:Nombreevaluacion, null, null)',
      {replacements: {Nombreevaluacion: nombreevaluacion}}
    );

    if(!status) throw badRequestError(message)
  },

  async update (id, {nombreevaluacion, gradoid}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_update_evaluaciones (:Evaluacion_id, :Nombreevaluacion, null, null)',
      {replacements: {Evaluacion_id:id, Nombreevaluacion: nombreevaluacion|| null}}
    );

    if(!status) throw badRequestError(message)
  },


  async delete (id) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_delete_evaluaciones (:Evaluacion_id, null, null)',
      {replacements: {Evaluacion_id: id}}
    );

    if(!status) throw badRequestError(message)
  },

  async getOne (id) {
    let [data] = await mainDB.query('select * from f_get_evaluacion(:Evaluacion_id);',
      {replacements: {Evaluacion_id: id}}
    );

    if(data.length < 1) throw notFoundError('Evaluacion no encontrado, validar nuevamente dato ingresado');

    return data;
  },

  
  async search (param) {
    let [data] = await mainDB.query('select * from  f_buscar_evaluacion(:Param);',
      {replacements: {Param: param}}
    );

    if(data.length < 1) throw notFoundError('Evaluacion No Encontrado');

    return data;
  },
}
