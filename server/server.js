const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const randomColor = require('randomcolor');

const app = express();
const clientPath = `${__dirname}/../client`;

console.log(`serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (sock) => {
  const color = randomColor();

  sock.on('message', (text) => io.emit('message', text));
  sock.on('turn', ({ x, y }) => {
    io.emit('turn', { x, y, color })
  });
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(8080, () => {
  console.log('server started on 8080');
});
