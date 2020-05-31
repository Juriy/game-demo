const createBoard = (size) => {

  // two-dimensional array filled with nulls
  let board;

  const clear = () => {
    board = Array(size).fill().map(() => Array(size).fill(null))
  };

  const inBounds = (x, y) => {
    return y >= 0 && y < board.length && x >= 0 && x < board[y].length;
  };

  const numMatches = (x, y, dx, dy) => {
    let i = 1;
    while (inBounds(x + i*dx, y + i*dy) &&
    board[y + i*dy][x + i*dx] === board[y][x]) {
      i++;
    }
    return i - 1;
  };

  const isWinningTurn = (x, y) => {
    for (let dx = -1; dx < 2; dx++) {
      for (let dy = -1; dy < 2; dy++) {
        if (dx === 0 && dy === 0) {
          continue;
        }

        const count = numMatches(x, y, dx, dy) +
          numMatches(x, y, -dx, -dy) + 1;

        if (count > 4) {
          return true;
        }
      }
    }
    return false;
  };

  const makeTurn = (x, y, value) => {
    board[y][x] = value;
    return isWinningTurn(x, y);
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
