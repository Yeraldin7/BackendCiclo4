import pkg from 'mongoose';
const { Schema, model } = pkg;

//import {Schema, model} from "mongoose";

const estadoUsuarioSchema = new Schema({
    nombre:{
        type: String,
        required: true
    }
});
export default model("EstadoUsuarios", estadoUsuarioSchema)