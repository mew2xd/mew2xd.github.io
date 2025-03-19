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
            isPuzzleSolved = false;  
            document.getElementById('heartfelt-note').style.display = "none"; 

            // Reset the puzzle to the initial state
            puzzle = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 0]
            ];
            emptyRow = 2;
            emptyCol = 2;

            shufflePuzzle();  
            createPuzzle();  
        }

        function shufflePuzzle() {
            let moves = [];
            isPuzzleSolved = false;

            // Generate valid moves to shuffle the puzzle
            for (let i = 0; i < 1000; i++) {
                moves = [];
                if (emptyRow > 0) moves.push([emptyRow - 1, emptyCol]); // Up
                if (emptyRow < 2) moves.push([emptyRow + 1, emptyCol]); // Down
                if (emptyCol > 0) moves.push([emptyRow, emptyCol - 1]); // Left
                if (emptyCol < 2) moves.push([emptyRow, emptyCol + 1]); // Right

                const [newRow, newCol] = moves[Math.floor(Math.random() * moves.length)];

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
