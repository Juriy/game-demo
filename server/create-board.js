const createBoard = (size) => {

  // two-dimensional array filled with nulls
  let board;

  const clear = () => {
    board = Array(size).fill().map(() => Array(size).fill(null))
  };

  const makeTurn = (x, y, value) => {
    board[y][x] = value;
  };

  const getBoard = () => board;

  clear();
  return {
    makeTurn,
    getBoard,
    clear
  }
};

module.exports = createBoard;
