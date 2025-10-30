const express = require("express");
const router = express.Router();
const Perfil = require("../models/perfilModel");

//  Obtener todos los usuarios 
router.get("/admin/perfiles", (req, res) => {
  Perfil.find()
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(500).json({ message: "Error al obtener perfiles", error })
    );
});

// Obtener todos los administradores
router.get("/admin/administradores", (req, res) => {
  Perfil.find({ rolperfil: "administrador" })
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(500).json({ message: "Error al obtener administradores", error })
    );
});

module.exports = router;