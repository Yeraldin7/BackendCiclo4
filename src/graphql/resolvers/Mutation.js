

import Producto from "../../models/Producto.js";
import Persona from "../../models/Person.js";
import Post from "../../models/Post.js";
import Rol from "../../models/Rol.js";
import EstadoUsuario from "../../models/EstadoUsuario.js";
import EstadoProyecto from "../../models/EstadoProyecto.js";
import Fase from "../../models/Fase.js";
import Avance from "../../models/Avance.js";
import EstadoInscripcion from "../../models/EstadoInscripcion.js";
import Usuario from "../../models/Usuario.js";

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
    createAvance: async (_, { descripcion, observacion, idProyecto, fecha }) => {
        const newAvance = new Avance({ descripcion, observacion, idProyecto, fecha })
        return await newAvance.save();},
    createEstadoInscripcion: async (_, { nombre }) => {
        const newEstadoInscripcion = new EstadoInscripcion({ nombre })
        return await newEstadoInscripcion.save();},
    createUsuario: async (_, { nombreCompleto, identificacion, correo, contrasena, rolId, estadoId }) => {        
        const newUsuario = new Usuario({ nombreCompleto, identificacion, correo, contrasena})
        newUsuario.rol = rolId
        newUsuario.estado = estadoId
        const usuarioCreado = await newUsuario.save()
        return usuarioCreado.populate('estado rol')},


    createProducto: async (_, { nombre, descrip, almacen }) => {
        const newProducto = new Producto({ nombre, descrip, almacen })
        return await newProducto.save();},
    createPerson: async (_, { name, age, post }) => {
        const newPersona= new Persona({ name, age, post  })
        return await newPersona.save(); },
    createPost: async (_, {title, autor}) => {
        const newPost= new Post({ title, autor})
        return await newPost.save(); }
}


export default Mutation;