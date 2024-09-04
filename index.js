const express = require('express');
const app = express();

app.use(express.json());

app.post('/make-move', (req, res) => {
  const board = req.body.board;
  const turn = req.body.turn;
  const bestMove = minimax(board, turn);
  res.json({ move: bestMove });
});

function minimax(board, turn) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let bestMove = -1;
  let bestScore = -Infinity;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = turn;
      const score = minimax(board, turn === 'X' ? 'O' : 'X');
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

app.listen(3001, () => {
  console.log('AI server listening on port 3001');
});
