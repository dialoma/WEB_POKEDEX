const express = require("express");
const app = express();
const path = require("path");

// Static files
app.use(express.static("public"));

// Index route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Detail route
app.get("/pokemon/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "public/detail.html"));
});

// Launch server
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
