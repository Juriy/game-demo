const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const randomColor = require('randomcolor');
const createBoard = require('./create-board');
const createCooldown = require('./create-cooldown');

const app = express();
const clientPath = `${__dirname}/../client`;

console.log(`serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketio(server);
const { makeTurn, getBoard, clear } = createBoard(20);

io.on('connection', (sock) => {
  const color = randomColor();

  // increase number to have cooldown between turns
  const cooldown = createCooldown(10);

  const onTurn = ({ x, y }) => {
    if (cooldown()) {
      io.emit('turn', { x, y, color });
      const playerWin = makeTurn(x, y, color);

      if (playerWin) {
        sock.emit('message', 'YOU WIN');
        io.emit('message', 'new round');
        clear();
        io.emit('board');
      }
    }
  };

  // Disabled, until the client side is injection-proof
  // sock.on('message', (text) => io.emit('message', text));
  sock.on('turn', onTurn);

  sock.emit('board', getBoard());
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(8080, () => {
  console.log('server started on 8080');
});
