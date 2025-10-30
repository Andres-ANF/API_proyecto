const express = require("express");
const router = express.Router();
const Perfil = require("../models/perfilModel");
const verificarAdmin = require("../middlewares/verificarAdmin");

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

// Consultar perfil por ID
router.get("/perfil/:id", (req, res) => {
  const { id } = req.params;
  Perfil.findById(id)
    .then((data) => {
      if (!data) return res.status(404).json({ message: "Perfil no encontrado" });
      res.json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Actualizar perfil
router.put("/perfil/:id", (req, res) => {
  const { id } = req.params;
  Perfil.updateOne({ _id: id }, { $set: req.body })
    .then((data) =>
      res.json({ message: "Perfil actualizado correctamente", data })
    )
    .catch((error) => res.status(400).json({ message: error.message }));
});

// Eliminar perfil
router.delete("/perfil/:id", (req, res) => {
  const { id } = req.params;
  Perfil.deleteOne({ _id: id })
    .then((data) => res.json({ message: "Perfil eliminado correctamente", data }))
    .catch((error) => res.status(400).json({ message: error.message }));
});

// Eliminar una publicación del historial
router.patch("/perfil/:id/eliminar-publicacion", (req, res) => {
  const { id } = req.params;
  const { publicacion } = req.body;
  Perfil.updateOne({ _id: id }, { $pull: { historialPublicaciones: publicacion } })
    .then((data) =>
      res.json({ message: "Publicación eliminada del historial", data })
    )
    .catch((error) => res.status(400).json({ message: error.message }));
});

// Agregar una publicación al historial
router.patch("/perfil/:id/agregar-publicacion", (req, res) => {
  const { id } = req.params;
  const { publicacion } = req.body;
  Perfil.updateOne({ _id: id }, { $push: { historialPublicaciones: publicacion } })
    .then((data) =>
      res.json({ message: "Publicación agregada al historial", data })
    )
    .catch((error) => res.status(400).json({ message: error.message }));
});


module.exports = router;