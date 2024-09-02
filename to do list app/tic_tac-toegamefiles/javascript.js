const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset');
const popup = document.getElementById('popup');
const popupText = document.querySelector('.popup-text');
const popupResetButton = document.querySelector('.popup-reset');

let currentPlayer = 'X';
let board = Array(9).fill('');
let isGameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', restartGame);
popupResetButton.addEventListener('click', restartGame);

function handleClick(e) {
    const index = e.target.getAttribute('data-index');

    if (board[index] !== '' || isGameOver) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        showPopup(`Player ${currentPlayer} wins!`);
        isGameOver = true;
    } else if (board.every(cell => cell !== '')) {
        showPopup(`It's a draw!`);
        isGameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function showPopup(message) {
    popupText.textContent = message;
    popup.style.display = 'flex';
}

function restartGame() {
    board.fill('');
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    isGameOver = false;
    popup.style.display = 'none';
}
