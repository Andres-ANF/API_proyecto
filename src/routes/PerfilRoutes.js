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