const express = require("express");
const router = express.Router();
const perfilSchema = require("../models/perfilModel");

// Crear perfil académico
router.post("/perfil", (req, res) => {
  const perfil = new perfilSchema(req.body);
  perfil
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});
// Consultar todos los perfiles
router.get("/perfil", (req, res) => {
  perfilSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});