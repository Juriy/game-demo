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

const createBoard = (canvas) => {
  const ctx = canvas.getContext('2d');

  const fillRect = (x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 20, 20);
  };

  return { fillRect };
};


(() => {

  const sock = io();
  const canvas = document.querySelector('canvas');
  const { fillRect } = createBoard(canvas);

  fillRect(50, 50);
  
  sock.on('message', log);

  document
    .querySelector('#chat-form')
    .addEventListener('submit', onChatSubmitted(sock));
})();
