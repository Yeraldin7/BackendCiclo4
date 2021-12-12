import pkg from 'mongoose';
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
    idProyecto: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    }
});
export default model("Avances", avanceSchema)