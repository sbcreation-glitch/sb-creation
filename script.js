// script.js

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const modal = document.getElementById('winnerModal');
const winnerMessage = document.getElementById('winnerMessage');
const closeButton = document.querySelector('.close');

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

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        if (board[index] === '' && gameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showWinnerModal(`Player ${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        showWinnerModal("It's a tie!");
        gameActive = false;
    }
}

function showWinnerModal(message) {
    winnerMessage.textContent = message;
    modal.style.display = 'flex';
}

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    modal.style.display = 'none';
});
