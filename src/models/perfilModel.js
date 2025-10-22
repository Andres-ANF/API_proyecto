const mongoose = require("mongoose");

const perfilSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  biografia: {
    type: String,
    default: "Sin biografía",
  },
  fotoPerfil: {
    type: String,
    default: "default.jpg", // o una URL por defecto
  },
  historialPublicaciones: {
    type: [String], // lista de títulos o IDs de artículos
    default: [],
  },
});

module.exports = mongoose.model("Perfil", perfilSchema);
