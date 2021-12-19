
import Rol from "../../models/Rol.js";
import EstadoUsuario from "../../models/EstadoUsuario.js";
import EstadoProyecto from "../../models/EstadoProyecto.js";
import Fase from "../../models/Fase.js";
import Avance from "../../models/Avance.js";
import EstadoInscripcion from "../../models/EstadoInscripcion.js";
import Usuario from "../../models/Usuario.js";
import Proyecto from "../../models/Proyecto.js";
import Inscripcion from "../../models/Inscripcion.js";

const Mutation = {
    createRol: async (_, { nombre }) => {
        const newRol = new Rol({ nombre })
        return await newRol.save();},
    createEstadoUsuario: async (_, { nombre }) => {
        const newEstadoUsuario = new EstadoUsuario({ nombre })
        return await newEstadoUsuario.save();},
    createEstadoProyecto: async (_, { nombre }) => {
        const newEstadoProyecto = new EstadoProyecto({ nombre })
        return await newEstadoProyecto.save();},
    createFase: async (_, { nombre }) => {
        const newFase = new Fase({ nombre })
        return await newFase.save();},
    createAvance: async (_, { descripcion, observacion, proyectoId, fecha }) => {
        const newAvance = new Avance({ descripcion: descripcion, observacion: observacion, proyecto: proyectoId, fecha: fecha })
        const proyectoParaModificar = await Proyecto.findOneAndUpdate({'_id': proyectoId}, {
            $push: { avances: newAvance }
        })
        return (await newAvance.save()).populate('proyecto')},
    createEstadoInscripcion: async (_, { nombre }) => {
        const newEstadoInscripcion = new EstadoInscripcion({ nombre })
        return await newEstadoInscripcion.save();},
    createUsuario: async (_, { nombreCompleto, identificacion, correo, contrasena, rolId }) => {
        const newUsuario = new Usuario({ nombreCompleto, identificacion, correo, contrasena})
        newUsuario.rol = rolId
        const estadoPendiente = await EstadoUsuario.find({'nombre':'Pendiente'})
        newUsuario.estado = estadoPendiente[0]._id
        const usuarioCreado = await newUsuario.save()
        return usuarioCreado.populate('estado rol')},
    validateUsuario: async (_, { correo, contrasena }) => {
        const usurioEncontrado = await Usuario.find({'correo': correo})
        return usurioEncontrado != null && usurioEncontrado.length > 0 && usurioEncontrado[0].contrasena == contrasena},
    createProyecto: async (_, { nombre, objetivoGeneral, objetivoEspecifico, presupuesto, fechaInicio, fechaTerminacion}) => {
        const newProyecto = new Proyecto({ nombre, objetivoGeneral, objetivoEspecifico, presupuesto, fechaInicio, fechaTerminacion})
        newProyecto.aprobado = false
        const estadoInactivo = (await EstadoProyecto.find({'nombre':'Inactivo'}))[0]
        newProyecto.estado = estadoInactivo._id
        return (await newProyecto.save()).populate('estado fase avances')},
    updateUsuario: async (_, { id, nombreCompleto, identificacion, correo, contrasena, rolId }) => {
        const usurioParaModificar = await Usuario.findOneAndUpdate({'_id':id}, {
        'nombreCompleto' : nombreCompleto,
        'identificacion' : identificacion,
        'correo' : correo,
        'contrasena' : contrasena,
        'rolId' : rolId
        })
        return (await usurioParaModificar.findById(id)).populate('estado rol')},
    updateEstadoUsuario: async (_, { usuarioId, estadoId}) => {
        const usurioParaModificar = await Usuario.findOneAndUpdate({'_id': usuarioId}, {
            'estado' : estadoId
        })
        return (await Usuario.findById(usuarioId)).populate('estado rol')},
    updateAprobacionProyecto: async (_, { proyectoId, esAprobado}) => {
        const proyectoParaModificar = await Proyecto.findOneAndUpdate({'_id': proyectoId}, {
            'aprobado' : esAprobado
        })
        return (await Proyecto.findById(proyectoId)).populate('estado fase avances')},
    updateEstadoProyecto: async (_, { proyectoId, estadoId}) => {
        const proyectoParaModificar = await Proyecto.findOneAndUpdate({'_id': proyectoId}, {
            'estado' : estadoId
        })
        return (await Proyecto.findById(proyectoId)).populate('estado fase avances')},
    updateFaseProyecto: async (_, { proyectoId, faseId}) => {
        const proyectoParaModificar = await Proyecto.findOneAndUpdate({'_id': proyectoId}, {
            'fase' : faseId
        })
        return (await Proyecto.findById(proyectoId)).populate('estado fase avances')},
    updateLiderProyecto: async (_, { proyectoId, usuarioId}) => {
        //Busca al lider
        const lider = await Usuario.findById(usuarioId).populate('rol')
        //Si el usuario no es lider no hace nada y devuelve el proyecto tal cual
        if (lider.rol.nombre != "Lider") {
            return (await Proyecto.findById(proyectoId)).populate('estado fase avances')
        }
        //Busca la información del proyecto y actualiza los campos documentoLider y nombreLider
        const proyectoParaModificar = await Proyecto.findOneAndUpdate({'_id': proyectoId}, {
            'documentoLider' : lider.identificacion,
            'nombreLider' : lider.nombreCompleto
        })
        //Agrega el proyecto a la lista de proyectos del usuario
        await Usuario.findOneAndUpdate({'_id': usuarioId}, {
            $push: { proyectos: proyectoParaModificar }
        })
        return (await Proyecto.findById(proyectoId)).populate('estado fase avances')},
    updateProyecto: async (_, { proyectoId, nombre, objetivoGeneral, objetivoEspecifico, presupuesto}) => {
        const proyectoParaModificar = await Proyecto.findOneAndUpdate({'_id': proyectoId}, {
            'nombre' : nombre,
            'objetivoGeneral' : objetivoGeneral,
            'objetivoEspecifico' : objetivoEspecifico,
            'presupuesto' : presupuesto
        })
        return (await Proyecto.findById(proyectoId)).populate('estado fase avances')},
    createInscripcion: async (_, { liderId, estudianteId, proyectoId, fechaIngreso, fechaEgreso}) => {
        const estadoPendiente = (await EstadoInscripcion.find({'nombre':'Pendiente'}))[0]
        const newInscripcion = new Inscripcion({ lider: liderId, estudiante: estudianteId, proyecto: proyectoId, fechaIngreso: fechaIngreso, fechaEgreso: fechaEgreso, estado: estadoPendiente})
        return (await newInscripcion.save()).populate('lider estudiante proyecto estado')},
    updateEstadoInscripcion: async (_, { inscripcionId, estadoId}) => {
        const inscripcionParaModificar = await Inscripcion.findOneAndUpdate({'_id': inscripcionId}, {
            'estado' : estadoId
        })
        return (await Inscripcion.findById(inscripcionId)).populate('lider estudiante proyecto estado')},
    updateObservacionesAvance: async (_, { avanceId, observacion}) => {
        await Avance.findOneAndUpdate({'_id': avanceId}, {
            'observacion' : observacion
        })
        return (await Avance.findById(avanceId)).populate('proyecto')},
    updateDescripcionAvance: async (_, { avanceId, descripcion}) => {
        await Avance.findOneAndUpdate({'_id': avanceId}, {
            'descripcion' : descripcion
        })
        return (await Avance.findById(avanceId)).populate('proyecto')}
}


export default Mutation;