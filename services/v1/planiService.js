const { badRequestError, notFoundError } = require('../../errors');
const { _main: mainDB } = require('../../loaders/postgres');

module.exports = {    
  /*async create ({recursonombre}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_crear_recurso (:Recursonombre, null, null)',
      {replacements: {Recursonombre: recursonombre}}
    );

    if(!status) throw badRequestError(message)
  },*/

 async update (id, {ptipo, pid, pdescripcion}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call pas_actualizar_planificacion_detalle (:Id, :Ptipo, Pid, Pdescripcion, null, null)',
      {replacements: {Id: id, Ptipo: ptipo || null , Pid: pid || null, Pdescripcion: pdescripcion || null}}
    );

    if(!status) throw badRequestError(message)
  },


  async delete (id , {usuario_id}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call pas_eliminar_planificacion (:Planificacion_id, :Usuario_id,null, null)',
      {replacements: {Planificacion_id: id,Usuario_id:usuario_id  }}
    );

    if(!status) throw badRequestError(message)
  },

    async deletep (id , {ptipo,pid}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query    ('call pas_eliminar_planificacion_detalle (:Planificacion_id, :Ptipo, :Pid, null, null)',
      {replacements: {Planificacion_id: id, Ptipo:ptipo,  Pid:pid }}
    );

    if(!status) throw badRequestError(message)
  },


  async getOne (id) {
    let [data] = await mainDB.query('select * from fas_get_planificacion(:Idplanificacion);',
      {replacements: {Idplanificacion: id}}
    );

    if(data.length < 1) throw notFoundError('No se encuentra, validar nombre nuevamente');

    return data;
  },

}
