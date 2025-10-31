const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Perfil = require("../models/perfilModel");

dotenv.config();

//registro

router.post("/signup", async (req, res) => {
  try {
    const { nombre, correo, password, rolperfil } = req.body;

    // Validar datos básicos
    if (!nombre || !correo || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el correo ya existe
    const existeUsuario = await Perfil.findOne({ correo });
    if (existeUsuario) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo perfil
    const nuevoPerfil = new Perfil({
      nombre,
      correo,
      password: hashedPassword,
      rolperfil: rolperfil || "usuario",
    });

    await nuevoPerfil.save();

    // Crear token JWT_SECRET
    const token = jwt.sign(
      { id: nuevoPerfil._id, rolperfil: nuevoPerfil.rolperfil },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: {
        id: nuevoPerfil._id,
        nombre: nuevoPerfil.nombre,
        correo: nuevoPerfil.correo,
        rolperfil: nuevoPerfil.rolperfil,
      },
    });
  } catch (error) {
    console.error("Error en /signup:", error);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
});