import pkg from 'mongoose';
const { Schema, model } = pkg;

//import {Schema, model} from "mongoose";

const faseSchema = new Schema({
    nombre:{
        type: String,
        required: true
    }
});
export default model("Fases", faseSchema)