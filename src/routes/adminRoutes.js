const express = require("express");
const router = express.Router();
const Perfil = require("../models/perfilModel");
const verificarAdmin = require("../middlewares/verificarAdmin");

router.use(verificarAdmin);


/* =============================
   RUTAS DE ADMINISTRADOR
============================= */

// Obtener todos los perfiles
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

// Buscar perfil por ID (para admin)
router.get("/admin/perfil/:id", (req, res) => {
  const { id } = req.params;

  Perfil.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Perfil no encontrado" });
      }
      res.json(data);
    })
    .catch((error) =>
      res.status(500).json({ message: "Error al buscar el perfil", error })
    );
});

// Cambiar el rol de un usuario
router.patch("/admin/cambiar-rol/:id", (req, res) => {
  const { id } = req.params;
  const { nuevoRol } = req.body;

  if (!["usuario", "administrador"].includes(nuevoRol)) {
    return res.status(400).json({ message: "Rol no válido" });
  }

  Perfil.updateOne({ _id: id }, { $set: { rolperfil: nuevoRol } })
    .then((data) => {
      if (data.matchedCount === 0) {
        return res.status(404).json({ message: "Perfil no encontrado" });
      }
      res.json({ message: `Rol actualizado a ${nuevoRol}`, data });
    })
    .catch((error) =>
      res.status(400).json({ message: "Error al actualizar rol", error })
    );
});



// Eliminar cualquier perfil (usuario o admin)
router.delete("/admin/eliminar-perfil/:id", (req, res) => {
  const { id } = req.params;

  Perfil.deleteOne({ _id: id })
    .then((data) => {
      if (data.deletedCount === 0)
        return res.status(404).json({ message: "Perfil no encontrado" });

      res.json({ message: "Perfil eliminado correctamente", data });
    })
    .catch((error) =>
      res.status(400).json({ message: "Error al eliminar perfil", error })
    );
});

// Agregar publicación a un usuario
router.patch("/admin/agregar-publicacion/:id", (req, res) => {
  const { id } = req.params;
  const { publicacion } = req.body;

  if (!publicacion) {
    return res.status(400).json({ message: "Debes enviar una publicación" });
  }

  Perfil.updateOne({ _id: id }, { $push: { historialPublicaciones: publicacion } })
    .then((data) =>
      res.json({ message: "Publicación agregada al historial del usuario", data })
    )
    .catch((error) =>
      res.status(400).json({ message: "Error al agregar publicación", error })
    );
});

// Eliminar una publicación del historial de un usuario
router.patch("/admin/eliminar-publicacion/:id", (req, res) => {
  const { id } = req.params;
  const { publicacion } = req.body;

  if (!publicacion) {
    return res.status(400).json({ message: "Debes especificar la publicación" });
  }

  Perfil.updateOne({ _id: id }, { $pull: { historialPublicaciones: publicacion } })
    .then((data) =>
      res.json({ message: "Publicación eliminada del historial del usuario", data })
    )
    .catch((error) =>
      res.status(400).json({ message: "Error al eliminar publicación", error })
    );
});

module.exports = router;