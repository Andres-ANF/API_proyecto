const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Perfil = require("../models/perfilModel");

module.exports = async (req, res, next) => {
  try {
    // Obtener token 
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token no proporcionado o inválido." });
    }

    const token = authHeader.split(" ")[1];

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Token no válido." });
    }

    // Buscar al usuario autenticado en la base de datos
    const perfil = await Perfil.findById(decoded.id);
    if (!perfil) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // validar contraseña
    if (req.body.password) {
      const isMatch = await bcrypt.compare(req.body.password, perfil.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta." });
      }
    }

    // Verificar que sea administrador
    if (perfil.rolperfil !== "administrador") {
      return res.status(403).json({ message: "Acceso denegado. Se requiere rol de administrador." });
    }

    // Adjuntar información del usuario al request
    req.user = perfil;

    // Pasar al siguiente middleware o ruta
    next();

  } catch (error) {
    console.error("Error en middleware auth:", error);
    return res.status(401).json({ message: "Error de autenticación", error: error.message });
  }
};