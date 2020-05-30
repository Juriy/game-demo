const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const randomColor = require('randomcolor');
const createBoard = require('./create-board');

const app = express();
const clientPath = `${__dirname}/../client`;

console.log(`serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketio(server);
const { makeTurn, getBoard } = createBoard(20);

io.on('connection', (sock) => {
  const color = randomColor();

  sock.on('message', (text) => io.emit('message', text));
  sock.on('turn', ({ x, y }) => {
    io.emit('turn', { x, y, color });
    makeTurn(x, y, color);
  });

  sock.emit('board', getBoard());
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(8080, () => {
  console.log('server started on 8080');
});
