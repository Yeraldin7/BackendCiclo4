import pkg from 'mongoose';
import EstadoUsuario from './EstadoUsuario.js';
import Proyecto from './Proyecto.js';
import Rol from './Rol.js';
const { Schema, model } = pkg;

//import {Schema, model} from "mongoose";

const usuarioSchema = new Schema({
    nombreCompleto:{
        type: String,
        required: true
    },
    identificacion:{
        type: String,
        required: true
    },
    correo:{
        type: String,
        required: true
    },
    contrasena:{
        type: String,
        required: true
    },
    rol:{
        type: Schema.Types.ObjectId,
        ref: 'Roles',
        required: true
    },
    estado:{
        type: Schema.Types.ObjectId,
        ref: 'EstadoUsuarios',
        required: true
    },
    proyectos:{
        type: [Schema.Types.ObjectId],
        ref: 'Proyectos',
        required: false
    }
});
export default model("Usuarios", usuarioSchema)