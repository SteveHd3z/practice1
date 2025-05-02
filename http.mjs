import http from 'http';
import { findAvailablePort } from './free_port.mjs'; // Importar la función desde el otro archivo

const desiredPort = process.env.PORT ?? 3000;

findAvailablePort(desiredPort)
  .then((port) => {
    const server = http.createServer((req, res) => {
      res.end('Hello World, se generó una respuesta desde el servidor HTTP');
    });

    server.listen(port, () => {
      console.log(`Servidor HTTP escuchando en el puerto: ${server.address().port}`);
    });
  })
  .catch((err) => {
    console.error('Error al iniciar el servidor:', err);
    // process.exit(1);  // Considerar terminar el proceso
  });