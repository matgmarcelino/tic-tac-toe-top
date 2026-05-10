# Tic Tac Toe

A browser-based Tic Tac Toe game built as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

## Features

- Two-player local gameplay (X vs O)
- Custom player names via a name entry modal at game start
- Score tracking across rounds (wins and ties)
- Turn indicator showing whose turn it is
- New Round — resets the board while keeping the scores
- New Game — resets scores and prompts for new player names

## Tech Stack

- HTML, CSS, JavaScript (vanilla)
- Module pattern (IIFEs) for encapsulation: `gameBoard`, `gameController`, `displayController`

## How to Play

Open `index.html` in a browser. Enter player names when prompted, then take turns clicking squares. First to get three in a row wins. Use **New Round** to play again or **New Game** to start fresh.

## Project Structure

```
tic-tac-toe-top/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```
