import net from 'node:net';

/**
 * Busca un puerto disponible, comenzando por el puerto deseado.
 * @param {number} desiredPort - El puerto preferido.
 * @returns {Promise<number>} Una promesa que resuelve con el puerto disponible,
 * o rechaza con un error si no se encuentra ninguno.
 */
export function findAvailablePort(desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once('listening', () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });

    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        server.close(() => {
          findAvailablePort(0).then(resolve).catch(reject);
        });
      } else {
        server.close(() => reject(err));
      }
    });

    server.listen(desiredPort);
  });
}