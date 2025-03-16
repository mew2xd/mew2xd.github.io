let puzzle = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
];

let emptyRow = 2;
let emptyCol = 2;
let isPuzzleSolved = false;  // New flag to track if puzzle is solved

function createPuzzle() {
    const puzzleContainer = document.getElementById('puzzle-container');
    puzzleContainer.innerHTML = '';

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const value = puzzle[row][col];
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.dataset.row = row;
            piece.dataset.col = col;
            piece.textContent = value === 0 ? '' : value;

            if (value === 0) {
                piece.classList.add('empty');
            } else {
                piece.addEventListener('click', () => movePiece(row, col));
            }

            puzzleContainer.appendChild(piece);
        }
    }
}

function movePiece(row, col) {
    if (
        (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
        (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    ) {
        puzzle[emptyRow][emptyCol] = puzzle[row][col];
        puzzle[row][col] = 0;

        emptyRow = row;
        emptyCol = col;

        createPuzzle();
        checkWin();
    }
}

function checkWin() {
    let correct = true;
    let count = 1;

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (puzzle[row][col] !== count % 9) {
                correct = false;
            }
            count++;
        }
    }

    if (correct && !isPuzzleSolved) {
        isPuzzleSolved = true;  
        showHeartfeltMessage(); 
    }
}

function startPuzzle() {
    document.getElementById("puzzle-section").style.display = "block";
    shufflePuzzle();
    createPuzzle();
}

function shufflePuzzle() {
    for (let i = 0; i < 1000; i++) {
        const randomRow = Math.floor(Math.random() * 3);
        const randomCol = Math.floor(Math.random() * 3);

        movePiece(randomRow, randomCol);
    }
}

function showHeartfeltMessage() {
    const heartfeltNote = document.getElementById('heartfelt-note');
    heartfeltNote.style.display = "block"; 
}

function closeMessage() {
    document.getElementById('heartfelt-note').style.display = "none"; 
}
