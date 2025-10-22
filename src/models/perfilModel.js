const mongoose = require("mongoose");

const perfilSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, //asegura que todos los correos estén en minúsculas
    },
    biografia: {
      type: String,
      default: "Sin biografía",
      maxlength: 500, // límite de longitud opcional
    },
    fotoPerfil: {
      type: String,
      default: "default.jpg", //imagen por defecto
    },
    historialPublicaciones: {
      type: [String], // lista de títulos o IDs de artículos
      default: [],
    },
  },
  {
    timestamps: true, // crea campos "createdAt" y "updatedAt" que son para llevar el control de tiempo
    versionKey: false, // elimina el campo para la versión de los documentos (__v)
  }
);

module.exports = mongoose.model("Perfil", perfilSchema);
