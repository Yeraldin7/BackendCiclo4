import pkg from 'mongoose';
import Avance from './Avance.js';
import EstadoProyecto from './EstadoProyecto.js';
import Fase from './Fase.js';
const { Schema, model } = pkg;

//import {Schema, model} from "mongoose";

const proyectoSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    objetivoGeneral: {
        type: String,
        required: true
    },
    objetivoEspecifico: {
        type: String,
        required: true
    },
    presupuesto: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: String,
        required: true
    },
    fechaTerminacion: {
        type: String,
        required: true
    },
    aprobado: {
        type: Boolean,
        required: true
    },
    fase: {
        type: Schema.Types.ObjectId,
        ref: 'Fases',
        required: false
    },
    estado: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoProyectos',
        required: true
    },
    avances: {
        type: [Schema.Types.ObjectId],
        ref: 'Avances',
        required: false
    },
    documentoLider: {
        type: String,
        required: false
    },
    nombreLider: {
        type: String,
        required: false
    }
});
export default model("Proyectos",proyectoSchema )