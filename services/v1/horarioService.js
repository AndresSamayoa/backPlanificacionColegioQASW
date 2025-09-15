const { badRequestError, notFoundError } = require('../../errors');
const { _main: mainDB } = require('../../loaders/postgres');

module.exports = {    
  async create ({usuario_id, curso_id , seccion, bloque_id, dia, hora_inicio,  hora_fin}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query( 'call p_crear_asignacion_horario (:Usuario_id, :Curso_id , :Seccion, :Bloque_id, :Dia, :Hora_inicio,  :Hora_fin )',
      {replacements: {Usuario_id:usuario_id, Curso_id:curso_id, Seccion:seccion, Bloque_id:bloque_id, Dia:dia, Hora_inicio:hora_inicio,Hora_fin:hora_fin}}
    );

    if(!status) throw badRequestError(message)
  },


  async update (id, {usuario_id, curso_id , seccion, bloque_id, dia, dia_semana,hora_inicio,  hora_fin}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_update_asignacion_horario (:Horario_asignacion_id, :Usuario_id, :Curso_id , :Seccion, :Bloque_id, :Dia, :Dia_semana, :Hora_inicio,  :Hora_fin)',
      {replacements: {Horario_asignacion_id:id, Usuario_id:usuario_id|| null, Curso_id:curso_id|| null, Seccion:seccion|| null, Bloque_id:bloque_id|| null,
        Dia:dia|| null, Dia_semana:dia_semana|| null, Hora_inicio:hora_inicio|| null, GradoHora_finid:hora_fin || null}} );

    if(!status) throw badRequestError(message)
  },


  async delete (id) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call p_delete_asignacion_horario (:Horario_asignacion_id)',
      {replacements: {Horario_asignacion_id: id}}
    );

    if(!status) throw badRequestError(message)
  },

  async getOne (id, fecha_inicio, fecha_fin) {
    let [data] = await mainDB.query('select * from f_get_asignacion_horarios_usuario(:Usuario_id, :Fecha_inicio, :Fecha_fin);',
      {replacements: {Usuario_id:id, Fecha_inicio:fecha_inicio, Fecha_fin:fecha_fin}}
    );

    if(data.length < 1) throw notFoundError(' no encontrado, validar nuevamente dato ingresado');

    return data;
  },


  async search (param, fecha_inicio, fecha_fin) {
    let [data] = await mainDB.query('select * from  f_buscar_asignacion_horario(:Param, :Fecha_inicio, :Fecha_fin);',
      {replacements: {Param: param, Fecha_inicio:fecha_inicio, Fecha_fin:fecha_fin}}
    );

    if(data.length < 1) throw notFoundError(' No Encontrado');

    return data;
  },
}
