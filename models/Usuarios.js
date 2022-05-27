const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nombre: String,
    correo_electronico: String,
    password: String
})

//Crear modelo
module.exports =  mongoose.model("Usuarios", userSchema);