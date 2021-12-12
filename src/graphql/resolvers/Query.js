import Producto from "../../models/Producto.js"
import Persona from "../../models/Person.js"
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
        return await Usuario.find().populate('estado rol')
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
        return await Proyecto.find()
    },
    roles: async () => {
        return await Rol.find()
    },




    personas: async () => {
        return await Persona.find()
    },
    productos: async () => {
        return await Producto.find()
    },
    personas: async () => {
        return await Persona.find()
    },
}

export default Query;