function ChessBoard(node) {
    let isHighlightEnabled = true;
    const map = new Map();

    function diagonalHighlight(e) {
        map.clear();
        const pos = e.target.innerHTML;
        for (let i = pos[0] - 1, j = pos[1] - 1; i >= 1; i--, j--) {
            map.set(`${i}${j}`, 1);
        }
        for (let i = +pos[0] + 1, j = +pos[1] + 1; j <= 8; i++, j++) {
            map.set(`${i}${j}`, 1);
        }
        render(+pos[0] + +pos[1]);
    }

    function render(sum) {
        const chessBoard = document.createElement("div");
        chessBoard.id = "chessboard";
        for (let i = 0; i < 8; i++) {
            const rowDiv = document.createElement("div");
            rowDiv.id = `row${i + 1}`;
            rowDiv.className = "row";
            chessBoard.appendChild(rowDiv);

            for (let j = 0; j < 8; j++) {
                const columnDiv = document.createElement("div");
                columnDiv.id = `column${j + 1}`;
                columnDiv.innerHTML = `${i + 1}${j + 1}`;

                if ((i + j) % 2 === 0) {
                    columnDiv.className = "column white";
                } else {
                    columnDiv.className = "column black";
                }

                if (isHighlightEnabled) {
                    columnDiv.addEventListener("click", (e) =>
                        diagonalHighlight(e)
                    );
                    if (i + j + 2 === sum || map.has(`${i + 1}${j + 1}`)) {
                        columnDiv.className = columnDiv.className + " red";
                    }
                }
                rowDiv.appendChild(columnDiv);
            }
        }
        node.innerHTML = "";
        node.appendChild(chessBoard);
    }

    return {
        renderChessBoard() {
            render();
        },

        enableDiagonalHighlight() {
            isHighlightEnabled = true;
            render();
        },
    };
}

const htmlNode = document.querySelector("#container");
const b1 = ChessBoard(htmlNode);
b1.renderChessBoard();
