const boardSize = [4,5];

const gameBoard = document.querySelector('#gameBoard');

let numRows = "";

for (i = 0; i < boardSize[0];i++) {
    numRows += '1fr ';  
}
numRows = numRows.slice(0,-1);
gameBoard.style.gridTemplateRows = numRows + ';';
console.log(gameBoard);

for (i = 0; i < (boardSize[0] * boardSize[1]); i++) {
    const slot = document.createElement('img');
    slot.classList.add(`slot`);
    slot.setAttribute('src','BlankPiece.png');

    gameBoard.appendChild(slot);
    currentRow = Math.ceil((i+1)/boardSize[1]);
    currentCol = i + 1 - (Math.floor(i/boardSize[1]))*boardSize[1];
    console.log(currentRow,currentCol);
    slot.style.gridRow = `${currentRow}`;
    slot.style.gridColumn = `${currentCol}`;
}
