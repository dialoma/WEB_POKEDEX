// Importa Express
const express = require('express');

// Crea una instancia de la aplicación Express
const app = express();

// Sirve archivos estáticos de la carpeta 'public'
app.get('/', (req, res) => {
  res.send('Bienvenido a mi Pokedex');
});

// Define una ruta para la página principal
app.use(express.static('public'));

// Haz que el servidor escuche en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});