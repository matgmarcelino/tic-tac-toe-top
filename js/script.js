const gameBoard = (() => {
  const board = [null, null, null, null, null, null, null, null, null];
  const getBoard = () => [...board];
  const resetBoard = () => {
    board.fill(null);
  };
  const setSquare = (square, marker) => {
    if (board[square] !== null) return null;
  
    board[square] = marker;
    return true;
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
  let playerXWins = 0;
  let playerOWins = 0;
  let ties = 0;
  let status;
  
  const setPlayerXName = (name) => {
    playerX.setName(name);
  }
  const setPlayerOName = (name) => {
    playerO.setName(name);
  }
  const checkWin = () => {
    const board = gameBoard.getBoard();

    // check rows
    for (let i = 0; i <= 6; i += 3) {
      if (
        board[i] !== null && 
        board[i] === board[i + 1] && 
        board[i] === board[i + 2]
      ) {
          return players.find((p) => p.getMarker() === board[i]);
        }
    }

    // check columns
    for (let i = 0; i <= 2; i++) {
      if (
        board[i] !== null &&
        board[i] === board[i + 3] &&
        board[i] === board[i + 6]
      ) {
        return players.find((p) => p.getMarker() === board[i]);
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
        return players.find((p) => p.getMarker() === board[4]);
      }
    return null;
  }
  const switchTurns = () => {
    if (currentTurn === players[0])
      currentTurn = players[1];
    else 
      currentTurn = players[0];
  }

  const playTurn = (square) => {
    if (status === 'win' || status === 'tie') return;

    if (gameBoard.setSquare(square, currentTurn.getMarker()) === null) {
      status = 'occupied';
      return;
    }
    turnsLeft--;
    let winner;
    if ((winner = checkWin()) === null && turnsLeft === 0) {
      ties++;
      status = 'tie';
    }
    else if (winner === playerX) {
      playerXWins++;
      status = 'win';
    }
    else if (winner === playerO) {
      playerOWins++;
      status = 'win';
    }
    else {
      status = 'continue';
      switchTurns();
    }
  }  

  const getStatus = () => status;

  const newRound = () => {
    gameBoard.resetBoard();
    turnsLeft = 9;
    status = undefined;
    switchTurns();
  }

  const newGame = () => {
    ties = 0;
    playerXWins = 0;
    playerOWins = 0;
    setPlayerXName('Player X');
    setPlayerOName('Player O');
    newRound();
  }

  const getCurrentPlayer = () => currentTurn;

  const getPlayerXWins = () => playerXWins;
  const getPlayerOWins = () => playerOWins;
  const getTies = () => ties;

  return { setPlayerOName, setPlayerXName, playTurn, newRound, newGame, getCurrentPlayer, getStatus, getPlayerXWins, getPlayerOWins, getTies }
})();

const displayController = (() => {
  const playerXWinsDisplayer = document.querySelector('#playerXWins');
  const tiesDisplayer = document.querySelector('#ties');
  const playerOWinsDisplayer = document.querySelector('#playerOWins');
  const restOfTurnDisplay = document.querySelector('#restOfTurnDisplay');
  const currentTurnPlayerDisplay = document.querySelector('#currentTurnPlayer');
  
  const possessive = (name) => name.at(-1).toLowerCase() === 's' ? name + "'" : name + "'s";

  const updateDisplay = () => {
    playerXWinsDisplayer.textContent = gameController.getPlayerXWins();
    playerOWinsDisplayer.textContent = gameController.getPlayerOWins();
    tiesDisplayer.textContent = gameController.getTies();

    const status = gameController.getStatus();
    const currentTurnPlayer = gameController.getCurrentPlayer();
    currentTurnPlayerDisplay.className = 'player' + currentTurnPlayer.getMarker();
    restOfTurnDisplay.className = '';

    if (status === 'tie') {
      currentTurnPlayerDisplay.textContent = '';
      restOfTurnDisplay.textContent = "It's a tie!";
    } else if (status === 'win') {
      currentTurnPlayerDisplay.textContent = possessive(currentTurnPlayer.getName());
      restOfTurnDisplay.textContent = 'wins!';
      restOfTurnDisplay.className = 'color-win';
    } else {
      currentTurnPlayerDisplay.textContent = possessive(currentTurnPlayer.getName());
      restOfTurnDisplay.textContent = 'turn';
    }

    // Grid
    const squares = document.querySelectorAll('.square');
    const board = gameBoard.getBoard();
    board.forEach((sqr, i) => {
      squares[i].textContent = sqr ?? '';
      squares[i].className = sqr ? 'square player' + sqr : 'square';
    });
  }
  return { updateDisplay }
})();

const nameGetterModal = document.querySelector('#nameGetterModal');
const submitNamesBtn = nameGetterModal.querySelector('#submitNamesBtn');
submitNamesBtn.addEventListener('click', e => {
  e.preventDefault();
  const playerXName = nameGetterModal.querySelector('#playerXName').value;
  const playerOName = nameGetterModal.querySelector('#playerOName').value;
  
  if (playerXName !== '')
    gameController.setPlayerXName(playerXName);
  if (playerOName !== '') 
    gameController.setPlayerOName(playerOName);

  displayController.updateDisplay();
  nameGetterModal.close();
})

const grid = document.querySelector('#grid');
grid.addEventListener('click', e => {
  if (!e.target.classList.contains('square')) return;

  const allSquares = Array.from(grid.querySelectorAll('.square'));
  const square = allSquares.indexOf(e.target);
  gameController.playTurn(square);
  displayController.updateDisplay();
})

nameGetterModal.showModal();

const newRoundBtn = document.querySelector('#newRoundBtn');
newRoundBtn.addEventListener('click', () => {
  gameController.newRound();
  displayController.updateDisplay();
});

const newGameBtn = document.querySelector('#newGameBtn');
newGameBtn.addEventListener('click', () => {
  gameController.newGame(); 
  displayController.updateDisplay();
  nameGetterModal.querySelector('#playerXName').value = '';
  nameGetterModal.querySelector('#playerOName').value = '';
  nameGetterModal.showModal();
});









