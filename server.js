const express = require("express");
const app = express();
const path = require("path");

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta para la página de detalle del Pokémon
app.get("/pokemon/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "detail.html"));
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
