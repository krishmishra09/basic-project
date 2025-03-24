const boxes = document.querySelectorAll('.box');
const resetButton = document.getElementById('reset-btn');
const messageContainer = document.querySelector('.msg-container');
const message = document.getElementById('msg');
const newGameButton = document.getElementById('new-btn');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

// Function to check for a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.includes(null) ? null : 'Draw';
}

// Function to handle box clicks
function handleBoxClick(event) {
  const box = event.target;
  const index = Array.from(boxes).indexOf(box);

  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  box.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    gameActive = false;
    messageContainer.classList.remove('hide');
    message.textContent = winner === 'Draw' ? 'It\'s a Draw!' : `${winner} Wins!`;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Function to reset the game
function resetGame() {
  board.fill(null);
  gameActive = true;
  currentPlayer = 'X';
  boxes.forEach(box => (box.textContent = ''));
  messageContainer.classList.add('hide');
}

// Add event listeners
boxes.forEach(box => box.addEventListener('click', handleBoxClick));
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame);