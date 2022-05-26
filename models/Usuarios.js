const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    name: { type: String},
    correo_electronico: { type: String },
    password: { type: String },
})

//Crear modelo
const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;