const http = require('http');
const data = require('./Utils/data'); // Importa el archivo utils.js

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.url.startsWith('/rickandmorty/character/')) { // Verifica si la URL incluye "/rickandmorty/character/"
    const id = parseInt(req.url.split('/').pop()); // Obtiene el ID del personaje del final de la URL
    
    const character = data.find((character) => character.id === id); // Busca al personaje con el ID correspondiente
    
    if (character) { // Si se encuentra al personaje, envía una respuesta con un objeto JSON que lo contenga
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(character));
    } else { // Si no se encuentra al personaje, envía una respuesta de error 404
      res.statusCode = 404;
      res.end('Personaje no encontrado');
    }
  } else {
    res.end('Ruta no encontrada!');
  }
});

server.listen(3001, 'localhost',() => {
  console.log('Server listening on port 3001');
});
