const gameBoard = (() => {
  const board = [null, null, null, null, null, null, null, null, null];
  const getBoard = () => [...board];
  const resetBoard = () => {
    board.forEach((sqr, index) => board[index] = null);
  };
  const setSquare = (square, marker) => {
    square--;
    if (board[square] !== null) return null;
  
    board[square] = marker;
    return ++square + " set to " + marker;
  };
  return { setSquare, getBoard, resetBoard };
})();

const createPlayer = (name, m) => {
  const marker = m;
  const getMarker = () => marker;
  const setName = (n) => (name = n);
  const getName = () => name;

  return { setName, getName, getMarker };
};

const gameController = (() => {
  let playerX = createPlayer('Player X', 'X');
  let playerO = createPlayer('Player O', 'O');
  const players = [playerX, playerO]
  let currentTurn = (Math.random() < 0.5) ? players[0] : players[1];
  let turnsLeft = 9;
  
  const setPlayerXName = (name) => {
    playerX.setName(name);
  }
  const setPlayerOName = (name) => {
    playerO.setName(name);
  }
  const checkWin = () => {
    const board = gameBoard.getBoard();
    let whoWon;

    // check rows
    for (let i = 0; i <= 6; i += 3) {
      if (
        board[i] !== null && 
        board[i] === board[i + 1] && 
        board[i] === board[i + 2]
      ) {
          whoWon = players.find((p) => p.getMarker() === board[i]);
        }
    }

    // check columns
    for (let i = 0; i <= 2; i++) {
      if (
        board[i] !== null &&
        board[i] === board[i + 3] &&
        board[i] === board[i + 6]
      ) {
        whoWon = players.find((p) => p.getMarker() === board[i]);
      }
    }

    // check diagonals
    const middleSquare = board[4];
    if (
      middleSquare !== null &&
      (
        (board[0] === middleSquare && board[8] === middleSquare) ||
        (board[2] === middleSquare && board[6] === middleSquare)
      )
    ) {
        whoWon = players.find((p) => p.getMarker() === board[4]);
      }
    return whoWon;
  }
  const playTurn = (square) => {
    if (gameBoard.setSquare(square, currentTurn.getMarker()) === null) {
      // TODO: implement to DOM
      console.log('Square occupied');
      return;
    }  

    turnsLeft--;

    if (currentTurn === players[0])
      currentTurn = players[1];
    else 
      currentTurn = players[0];
    
    let winner;
    if ((winner = checkWin()) === undefined && turnsLeft === 0) {
      // TODO: implement to DOM
      console.log("It's a draw!");
      return;
    }

    if (winner === playerX) {
      // TODO: implement to DOM
      console.log(playerX.getName() + ' Won!');
    } else if (winner === playerO) {
      // TODO: implement to DOM
      console.log(playerO.getName() + ' Won!');
    }

  }  

  const restart = () => {
    gameBoard.resetBoard();
    turnsLeft = 9;
  }

  const getCurrentPlayer = () => currentTurn;
  
})();






