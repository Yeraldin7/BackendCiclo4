import pkg from 'mongoose';
import Proyecto from './Proyecto.js';
const { Schema, model } = pkg;

//import {Schema, model} from "mongoose";

const avanceSchema = new Schema({
    descripcion:{
        type: String,
        required: true
    },
    observacion: {
        type: String,
        required: true
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyectos',
        required: true
    },
    fecha: {
        type: String,
        required: true
    }
});
export default model("Avances", avanceSchema)