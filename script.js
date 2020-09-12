const boardSize = [4,5];
const currentPlayer = 1;

const gameBoard = document.querySelector('#gameBoard');
const userTurn = document.querySelectorAll('#userTurn p');

for (i = 0; i < (boardSize[0] * boardSize[1]); i++) {
    const slot = document.createElement('img');
    slot.classList.add(`slot`);
    slot.setAttribute('src','BlankPiece.png');

    gameBoard.appendChild(slot);
    currentRow = Math.ceil((i+1)/boardSize[1]);
    currentCol = i + 1 - (Math.floor(i/boardSize[1]))*boardSize[1];
    slot.style.gridRow = `${currentRow}`;
    slot.style.gridColumn = `${currentCol}`;
}

const fakeEvent = document.querySelectorAll('#gameBoard img');
function changeImage (event) {
    event[5].setAttribute('src','BlackPiece.png')
}
changeImage(fakeEvent)

function changeTurn () {
    if (currentPlayer === 1) {
        console.log(userTurn[0]);
        userTurn[0].style.color = '#12130f';
        userTurn[0].style.backgroundColor = '#12130f';
        userTurn[0].style.border = '#12130f';

        userTurn[1].style.color = 'white';
        userTurn[1].style.border = 'grey solid 5px';
        userTurn[1].style.borderRadius = '10px';
    }
    else {
        userTurn[1].style.color = '#12130f';
        userTurn[1].style.border = '#12130f';

        userTurn[0].style.color = 'white';
        userTurn[0].style.backgroundColor = 'rgb(169, 7, 7)';
        userTurn[0].style.border = 'grey solid 5px';
        userTurn[0].style.borderRadius = '10px';
    }
}

changeTurn();

let numRows = "";

for (i = 0; i < boardSize[0];i++) {
    numRows += '1fr ';  
}
numRows = numRows.slice(0,-1);
//gameBoard.style.gridTemplateRows = numRows + ';';
console.log(gameBoard);