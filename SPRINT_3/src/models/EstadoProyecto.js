import pkg from 'mongoose';
const { Schema, model } = pkg;

//import {Schema, model} from "mongoose";

const estadoProyectoSchema = new Schema({
    nombre:{
        type: String,
        required: true
    }
});
export default model("EstadoProyectos", estadoProyectoSchema)