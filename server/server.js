const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const randomColor = require('randomcolor');
const createBoard = require('./create-board');

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);
const { clear, getBoard, makeTurn } = createBoard(20);

io.on('connection', (sock) => {
  const color = randomColor();
  sock.emit('board', getBoard());

  sock.on('message', (text) => io.emit('message', text));
  sock.on('turn', ({ x, y }) => {
    makeTurn(x, y, color);
    io.emit('turn', { x, y, color })
  });
});

server.on('error', (err) => {
  console.error(err);
});

server.listen(8080, () => {
  console.log('server is ready');
});
