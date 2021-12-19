import Usuario from "../../models/Usuario.js"
import Avance from "../../models/Avance.js"
import EstadoInscripcion from "../../models/EstadoInscripcion.js"
import EstadoProyecto from "../../models/EstadoProyecto.js"
import EstadoUsuario from "../../models/EstadoUsuario.js"
import Fase from "../../models/Fase.js"
import Inscripcion from "../../models/Inscripcion.js"
import Proyecto from "../../models/Proyecto.js"
import Rol from "../../models/Rol.js"
const Query = {

    hola() {
        return "Esta es la respuesta de la query hola"
    },
    usuarios: async () => {
        return await Usuario.find().populate('estado rol proyectos')
    },
    avances: async () => {
        return await Avance.find()
    },
    estadoInscripciones: async () => {
        return await EstadoInscripcion.find()
    },
    inscripciones: async () => {
        return await Inscripcion.find()
    },
    fases: async () => {
        return await Fase.find()
    },
    estadoProyectos: async () => {
        return await EstadoProyecto.find()
    },
    estadoUsuarios: async () => {
        return await EstadoUsuario.find()
    },
    proyectos: async () => {
        return await Proyecto.find().populate('estado fase avances')
    },
    roles: async () => {
        return await Rol.find()
    },
    estudiantes: async () => {
        const rolEstudiante = (await Rol.find({"nombre":"Estudiante"}))[0]
        return await Usuario.find({"rol": rolEstudiante._id}).populate('estado rol proyectos')
    },
    proyectosLider: async (_, { usuarioId}) => {
        //Busca al lider
        const lider = await Usuario.findById(usuarioId).populate('rol proyectos')
        //Si el usuario no es lider no hace nada y devuelve una lista vacia
        if (lider.rol.nombre != "Lider") {
            return []
        }
        //Filtra entre sus proyectos los que tengan su identificacion
        return lider.proyectos.filter(function(proyecto){
            return proyecto.documentoLider == lider.identificacion;
        })
    },
    inscripcionesLider: async (_, { liderId}) => {
        return await Inscripcion.find({"lider":liderId}).populate('lider estudiante proyecto estado')
    },
    proyecto: async (_, { proyectoId}) => {
        return await Proyecto.findById(proyectoId).populate('estado fase avances')
    }
}

export default Query;