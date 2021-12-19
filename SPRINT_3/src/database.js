import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Admin:y1013625182acn@proyecto-ciclo3.5zhtd.mongodb.net/proyectoCiclo4?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("La base de datos está conectada"))
    .catch(err => console.log(err));