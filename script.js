// Wordle Logic
const targetWord = "JUSTY"; // In a real app, pick from a list
let currentGuess = "";
let row = 0;

function initWordle() {
    const board = document.getElementById('game-board');
    if(!board) return;

    for (let i = 0; i < 6; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            rowDiv.appendChild(tile);
        }
        board.appendChild(rowDiv);
    }
}

document.addEventListener('keydown', (e) => {
    if (row >= 6) return;
    
    if (e.key === "Enter" && currentGuess.length === 5) {
        checkWord();
    } else if (e.key === "Backspace") {
        currentGuess = currentGuess.slice(0, -1);
        updateBoard();
    } else if (currentGuess.length < 5 && e.key.match(/^[a-z]$/i)) {
        currentGuess += e.key.toUpperCase();
        updateBoard();
    }
});

function updateBoard() {
    const rows = document.querySelectorAll('.row');
    const tiles = rows[row].querySelectorAll('.tile');
    for (let i = 0; i < 5; i++) {
        tiles[i].innerText = currentGuess[i] || "";
    }
}

function checkWord() {
    const rows = document.querySelectorAll('.row');
    const tiles = rows[row].querySelectorAll('.tile');
    
    for (let i = 0; i < 5; i++) {
        if (currentGuess[i] === targetWord[i]) {
            tiles[i].classList.add('correct');
        } else if (targetWord.includes(currentGuess[i])) {
            tiles[i].classList.add('present');
        } else {
            tiles[i].classList.add('absent');
        }
    }

    if (currentGuess === targetWord) {
        document.getElementById('message').innerText = "Just right!";
    } else {
        row++;
        currentGuess = "";
    }
}

initWordle();
