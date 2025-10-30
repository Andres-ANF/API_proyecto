module.exports = (req, res, next) => {
  
  const rol = req.headers["x-rolperfil"] || req.body.rolperfil;

  if (rol !== "administrador") {
    return res
      .status(403)
      .json({ message: "Acceso denegado. Se requiere rol de administrador." });
  }

  // Si el rol es administrador, pasa al siguiente paso
  next();
};