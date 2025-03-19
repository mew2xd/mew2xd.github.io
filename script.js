<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sliding Puzzle</title>
    <style>
        #puzzle-container {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            gap: 5px;
            margin-top: 20px;
        }
        .puzzle-piece {
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            background-color: lightblue;
            border: 1px solid black;
            cursor: pointer;
        }
        .empty {
            background-color: white;
            border: none;
            cursor: default;
        }
        #heartfelt-note {
            display: none;
            margin-top: 20px;
            padding: 10px;
            background-color: lightcoral;
            color: white;
            font-size: 18px;
        }
    </style>
</head>
<body>

    <button onclick="startPuzzle()">Start Puzzle</button>
    <div id="puzzle-section" style="display: none;">
        <div id="puzzle-container"></div>
    </div>

    <div id="heartfelt-note">
        🎉 Congratulations! You solved the puzzle! 🎉
        <button onclick="closeMessage()">Close</button>
    </div>

    <script>
        let puzzle = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 0]
        ];

        let emptyRow = 2;
        let emptyCol = 2;
        let isPuzzleSolved = false;  

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
            let count = 1;
            let correct = true;

            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    if (row === 2 && col === 2) {
                        if (puzzle[row][col] !== 0) correct = false;
                    } else {
                        if (puzzle[row][col] !== count) correct = false;
                        count++;
                    }
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
            isPuzzleSolved = false;  
            document.getElementById('heartfelt-note').style.display = "none"; 

            // Make valid random moves instead of calling movePiece()
            for (let i = 0; i < 1000; i++) {
                let moves = [];
                if (emptyRow > 0) moves.push([emptyRow - 1, emptyCol]); 
                if (emptyRow < 2) moves.push([emptyRow + 1, emptyCol]); 
                if (emptyCol > 0) moves.push([emptyRow, emptyCol - 1]); 
                if (emptyCol < 2) moves.push([emptyRow, emptyCol + 1]); 

                const [newRow, newCol] = moves[Math.floor(Math.random() * moves.length)];

                // Swap without triggering checkWin
                puzzle[emptyRow][emptyCol] = puzzle[newRow][newCol];
                puzzle[newRow][newCol] = 0;
                emptyRow = newRow;
                emptyCol = newCol;
            }
        }

        function showHeartfeltMessage() {
            document.getElementById('heartfelt-note').style.display = "block"; 
        }

        function closeMessage() {
            document.getElementById('heartfelt-note').style.display = "none"; 
        }
    </script>

</body>
</html>
