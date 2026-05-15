/** --- SHARED ASSETS --- **/
const words = ["APPLE", "BEACH", "BRAIN", "BREAD", "BRUSH", "CHAIR", "CHEST", "CHORD", "CLICK", "CLOCK", "CLOUD", "DANCE", "DIARY", "DRINK", "EARTH", "FEAST", "FIELD", "FRUIT", "GLASS", "GRAPE", "GREEN", "GHOST", "HEART", "HOUSE", "JUICE", "LIGHT", "LEMON", "MELON", "MONEY", "MUSIC", "NIGHT", "OCEAN", "PARTY", "PIANO", "PILOT", "PLANE", "PHONE", "PIZZA", "PLANT", "RADIO", "RIVER", "ROBOT", "SHIRT", "SHOES", "SMILE", "SNAKE", "SPACE", "SPOON", "STORM", "TABLE", "TIGER", "TOAST", "TOUCH", "TRAIN", "TRUCK", "VOICE", "WATER", "WATCH", "WHALE", "WORLD", "WRITE", "YOUTH", "ZEBRA"];

/** --- WORDLE LOGIC --- **/
if (document.getElementById('board')) {
    const targetWord = words[Math.floor(Math.random() * words.length)];
    let currentGuess = "";
    let attempts = 0;

    const board = document.getElementById('board');
    for (let i = 0; i < 30; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.id = 'tile-' + i;
        board.appendChild(tile);
    }

    document.addEventListener('keydown', (e) => {
        if (attempts >= 6) return;
        if (e.key === "Enter" && currentGuess.length === 5) {
            submitGuess();
        } else if (e.key === "Backspace") {
            currentGuess = currentGuess.slice(0, -1);
            updateWordleUI();
        } else if (currentGuess.length < 5 && /^[a-zA-Z]$/.test(e.key)) {
            currentGuess += e.key.toUpperCase();
            updateWordleUI();
        }
    });

    function updateWordleUI() {
        for (let i = 0; i < 5; i++) {
            const tile = document.getElementById('tile-' + (attempts * 5 + i));
            tile.textContent = currentGuess[i] || "";
        }
    }

    function submitGuess() {
        for (let i = 0; i < 5; i++) {
            const tile = document.getElementById('tile-' + (attempts * 5 + i));
            const char = currentGuess[i];
            if (char === targetWord[i]) tile.classList.add('correct');
            else if (targetWord.includes(char)) tile.classList.add('present');
            else tile.classList.add('absent');
        }
        if (currentGuess === targetWord) {
            document.getElementById('message').textContent = "Just right!";
            document.getElementById('reset').style.display = "block";
            attempts = 6;
        } else {
            attempts++;
            currentGuess = "";
            if (attempts === 6) {
                document.getElementById('message').textContent = `Word was: ${targetWord}`;
                document.getElementById('reset').style.display = "block";
            }
        }
    }
}

/** --- HANGMAN LOGIC --- **/
if (document.getElementById('hangman-container')) {
    const targetWord = words[Math.floor(Math.random() * words.length)];
    let guessed = [];
    let mistakes = 0;
    const stages = [
        "  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========",
        "  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========",
        "  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========",
        "  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========",
        "  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========",
        "  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========",
        "  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n========="
    ];

    function updateHangmanUI() {
        const display = targetWord.split('').map(l => guessed.includes(l) ? l : "_").join(" ");
        document.getElementById('word-display').textContent = display;
        document.getElementById('gallows').textContent = stages[mistakes];

        if (!display.includes("_")) {
            document.getElementById('message').textContent = "You saved him!";
            endHangman();
        } else if (mistakes >= 6) {
            document.getElementById('message').textContent = `Game Over. Word was: ${targetWord}`;
            endHangman();
        }
    }

    function endHangman() {
        document.getElementById('keyboard').style.pointerEvents = "none";
        document.getElementById('reset').style.display = "block";
    }

    // Create Keyboard
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'key';
        btn.textContent = letter;
        btn.onclick = () => {
            if (guessed.includes(letter)) return;
            guessed.push(letter);
            btn.classList.add('used');
            if (!targetWord.includes(letter)) mistakes++;
            updateHangmanUI();
        };
        document.getElementById('keyboard').appendChild(btn);
    });

    updateHangmanUI();
}
