const { badRequestError, notFoundError } = require('../../errors');
const { formatJsonArray, formatTextArray } = require('../../helpers/formatDBReplacements');
const { _main: mainDB } = require('../../loaders/postgres');

module.exports = {

async create({ tipo, horario, fecha, fecha_inicio, fecha_fin, contenidos, evaluaciones, recursos, logros, competencias }) { 
  contenidos = formatJsonArray(contenidos);
  evaluaciones = formatJsonArray(evaluaciones);
  recursos = formatJsonArray(recursos);
  logros = formatTextArray(logros);
  competencias = formatTextArray(competencias);

   const [[{ p_status: status, p_message: message }]] = await mainDB.query( 'call pas_crear_planificacion (:Type::varchar, :Assignation::int, :Date::date, :StartingDate::date, :EndingDate::date, :Contents::json[], :Evaluations::json[], :Resources::json[], :Competences::text[], :Archivements::text[], null, null)',
    {replacements: { Type: tipo, Assignation: horario, Date: fecha, StartingDate: fecha_inicio, EndingDate: fecha_fin, Contents: contenidos, Evaluations: evaluaciones, Competences: competencias, Archivements: logros, Resources: recursos }}
  );
  if(!status) throw badRequestError(message)
},

async planAprobar(pplanificacion_id, {pusuario_id }) { 
    const [[{ p_status: status, p_message: message }]] = await mainDB.query( 'call pas_aprobar_planificacion (:Pplanificacion_id, :Pusuario_id, null, null)',
    {replacements: { Pplanificacion_id: pplanificacion_id, Pusuario_id: pusuario_id }}
  );
    if(!status) throw badRequestError(message)
},

async planrechazar( pplanificacion_id, {pusuario_id, pcomentario }) { 
    const [[{ p_status: status, p_message: message }]] = await mainDB.query( 
      'call pas_rechazar_planificacion (:Pplanificacion_id, :Pusuario_id, :Pcomentario,null, null)',
    {replacements: { Pplanificacion_id: pplanificacion_id, Pusuario_id: pusuario_id , Pcomentario:pcomentario }}
  );
    if(!status) throw badRequestError(message)
},

async planagregardetalle(pplanificacion_id, {ptipo , pdatos }) { 
  pdatos = JSON.stringify(pdatos);

    const [[{ p_status: status, p_message: message }]] = await mainDB.query('call pas_agregar_planificacion_detalle (:Pplanificacion_id , :Ptipo , :Pdatos,null, null)',
    {replacements: {Pplanificacion_id: pplanificacion_id , Ptipo: ptipo , Pdatos: pdatos }}
  );
    if(!status) throw badRequestError(message)
},

 async update (id, {ptipo, pid, pdescripcion}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call pas_actualizar_planificacion_detalle (:Id, :Ptipo, Pid, Pdescripcion, null, null)',
      {replacements: {Id: id, Ptipo: ptipo || null , Pid: pid || null, Pdescripcion: pdescripcion || null}}
    );

    if(!status) throw badRequestError(message)
  },


  async delete (id) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query('call pas_eliminar_planificacion (:Planificacion_id, null, null)',
      {replacements: {Planificacion_id: id}}
    );

    if(!status) throw badRequestError(message)
  },

    async deletep (id , {id: pid, tipo: ptipo}) {
    const [[{p_status: status, p_message: message}]] = await mainDB.query    ('call pas_eliminar_planificacion_detalle (:Planificacion_id, :Ptipo, :Pid, null, null)',
      {replacements: {Planificacion_id: id, Ptipo:ptipo,  Pid:pid }}
    );

    if(!status) throw badRequestError(message)
  },


  async getOne (id) {
    let [data] = await mainDB.query('select * from fas_get_planificacion(:Idplanificacion);',
      {replacements: {Idplanificacion: id}}
    );

    if(data.length < 1) throw notFoundError('No se encuentra, validar nuevamente');

    return data;
  },

  async getDay (param) {
    let [data] = await mainDB.query('select * from fas_get_planificaciones_dia(:Param);',
      {replacements: {Param: param}}
    );

    if(data.length < 1) throw notFoundError('No se encuentra, validar fecha nuevamente');

    return data;
  },

}
