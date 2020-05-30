const getClickCoordinates = (element, event) => {
  const { top, left } = element.getBoundingClientRect();
  const { clientX, clientY } = event;
  return {
    x: clientX - left,
    y: clientY - top
  };
};

const log = (text) => {
  const parent = document.querySelector('#events');
  const el = document.createElement('li');
  el.innerHTML = text;

  parent.appendChild(el);
  parent.scrollTop = parent.scrollHeight;
};

const onChatSubmitted = (sock) => (e) => {
  e.preventDefault();

  const input = document.querySelector('#chat');
  const text = input.value;
  input.value = '';

  sock.emit('message', text);
};

const createBoard = (canvas, numCells = 20) => {
  const ctx = canvas.getContext('2d');

  const cellSize = Math.floor(400/numCells);

  const fillRect = (x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x - 10, y - 10, 20, 20);
  };

  const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawGrid = () => {
    ctx.beginPath();

    for (let i = 0; i < numCells + 1; i++) {
      ctx.moveTo(i*cellSize, 0);
      ctx.lineTo(i*cellSize, numCells*cellSize);

      ctx.moveTo(0, i*cellSize);
      ctx.lineTo(numCells*cellSize, i*cellSize);
    }

    ctx.stroke();
  };

  const reset = () => {
    clear();
    drawGrid();
  };

  return { fillRect, reset };
};


(() => {

  const sock = io();
  const canvas = document.querySelector('canvas');
  const { fillRect, reset } = createBoard(canvas);

  const onClick = (e) => {
    const { x, y } = getClickCoordinates(canvas, e);
    sock.emit('turn', { x, y });
  };

  reset();

  sock.on('message', log);
  sock.on('turn', ({ x, y, color }) => fillRect(x, y, color));

  document
    .querySelector('#chat-form')
    .addEventListener('submit', onChatSubmitted(sock));

  canvas.addEventListener('click', onClick);
})();
