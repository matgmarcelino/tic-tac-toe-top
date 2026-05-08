const gameBoard = (() => {
  const board = [null, null, null, null, null, null, null, null, null];
  const getBoard = () => [...board];
  const resetBoard = () => {
    board.forEach((sqr) => (sqr = null));
  };
  const setSquare = (square, marker) => {
    square--;
    if (board[square] !== null) {
      console.log("Square occupied.");
      return;
    }
    board[square] = marker;
    console.log(++square + " set to " + marker);
  };
  return { setSquare, getBoard, resetBoard };
})();

const gameController = () => {};

const createPlayer = (name, marker) => {
  const setName = (n) => (name = n);
  const getName = () => name;

  return { setName, getName, marker };
};

gameBoard.setSquare(2, "X");
console.log(gameBoard.getBoard());
gameBoard.resetBoard();
console.log(gameBoard.getBoard());
