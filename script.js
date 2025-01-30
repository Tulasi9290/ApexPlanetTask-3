const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetBtn = document.querySelector('.reset-btn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== '' || !isGameActive) return;

  updateCell(index, currentPlayer);
  checkWinner();

  if (isGameActive && currentPlayer === 'O') {
    setTimeout(computerMove, 500);
  }
}

function updateCell(index, player) {
  board[index] = player;
  cells[index].textContent = player;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText.textContent = `Player ${currentPlayer} wins!`;
      isGameActive = false;
      return;
    }
  }

  if (!board.includes('')) {
    statusText.textContent = 'It\'s a draw!';
    isGameActive = false;
    return;
  }

  switchPlayer();
}

function computerMove() {
  const availableCells = board
    .map((cell, index) => (cell === '' ? index : null))
    .filter((index) => index !== null);

  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const index = availableCells[randomIndex];

  if (index !== undefined) {
    updateCell(index, 'O');
    checkWinner();
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach((cell) => (cell.textContent = ''));
  currentPlayer = 'X';
  isGameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
