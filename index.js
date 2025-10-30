const parser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const perfilRoutes = require("./src/routes/perfilRoutes"); // Importa tus rutas
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();

// Permite leer datos enviados desde formularios o JSON
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

// Gestión de las rutas usando el middleware
app.use("/api", perfilRoutes);
app.use("/api", adminRoutes);

// Verificar conexión a MongoDB
console.log("MONGO_URI:", process.env.MONGO_URI);

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" Conexión exitosa a MongoDB"))
  .catch((error) => console.log(" Error en la conexión:", error));

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send(" API de Perfiles Académicos funcionando correctamente");
});

// Conexión al puerto
app.listen(port, () => {
  console.log(` Servidor corriendo en http://localhost:${port}`);
});
