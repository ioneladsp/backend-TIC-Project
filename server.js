require('dotenv').config();
const app = require('./app');
const http = require('http');
const logger = require('pino')();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const server = http.createServer(app);

const port = process.env.PORT || '9000';
app.set('port', port);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
}

function onListening() {
  const addr = server.address();
  logger.info(`Listening on ${addr.port}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
