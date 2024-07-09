document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const restartBtn = document.getElementById('restart-btn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', '']; // Represents the 3x3 game board

    // Function to create the game board cells
    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', () => handleCellClick(i));
            board.appendChild(cell);
        }
    }

    // Function to handle clicks on the cells
    function handleCellClick(index) {
        if (gameBoard[index] === '') {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkForWin()) {
                status.textContent = `Player ${currentPlayer} wins!`;
                disableBoard();
            } else if (checkForDraw()) {
                status.textContent = `It's a draw!`;
                disableBoard();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    // Function to render the current state of the board
    function renderBoard() {
        board.innerHTML = '';
        gameBoard.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => handleCellClick(index)); // Adjusted to pass index
            board.appendChild(cellElement);
        });
    }

    // Function to check for a win condition
    function checkForWin() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winConditions.some(condition => {
            return condition.every(index => gameBoard[index] === currentPlayer);
        });
    }

    // Function to check for a draw condition
    function checkForDraw() {
        return gameBoard.every(cell => cell !== '');
    }

    // Function to disable the board after the game ends
    function disableBoard() {
        board.querySelectorAll('.cell').forEach(cell => {
            cell.removeEventListener('click', () => handleCellClick); // Removed function reference
        });
    }

    // Function to reset the game
    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        renderBoard();
        status.textContent = `Player ${currentPlayer}'s turn`;
        board.querySelectorAll('.cell').forEach((cell, index) => {
            cell.addEventListener('click', () => handleCellClick(index)); // Adjusted to pass index
        });
    }

    // Initialize the game
    createBoard();
    restartBtn.addEventListener('click', resetGame);
});
