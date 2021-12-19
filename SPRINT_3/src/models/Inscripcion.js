import pkg from 'mongoose';
import EstadoInscripcion from './EstadoInscripcion.js';
import Proyecto from './Proyecto.js';
import Usuario from './Usuario.js';
const { Schema, model } = pkg;

//import {Schema, model} from "mongoose";

const inscripcionSchema = new Schema({
    lider:{
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: false
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyectos',
        required: false
    },
    fechaIngreso: {
        type: String,
        required: true
    },
    fechaEgreso: {
        type: String,
        required: true
    },
    estado: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoInscripciones',
        required: true
    }
});
export default model("Inscripciones",inscripcionSchema )