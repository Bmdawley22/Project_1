const boardSize = [6,7];
let currentPlayer = 2;

const arrowIcons = document.querySelector('#arrowIcons');
const gameBoard = document.querySelector('#gameBoard');
const userTurn = document.querySelectorAll('#userTurn p');

for (i = 0; i < boardSize[1]; i++){
    const arrow = document.createElement('img');
    arrow.classList.add(`arrow`);
    arrow.setAttribute('src','Arrow.gif');
    arrowIcons.appendChild(arrow);
    arrow.style.gridRow = "1";
    arrow.style.gridColumn = `${i+1}`;
}

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
        currentPlayer = 2;
    }
    else if (currentPlayer === 2){
        userTurn[1].style.color = '#12130f';
        userTurn[1].style.border = '#12130f';

        userTurn[0].style.color = 'white';
        userTurn[0].style.backgroundColor = 'rgb(169, 7, 7)';
        userTurn[0].style.border = 'grey solid 5px';
        userTurn[0].style.borderRadius = '10px';
        currentPlayer = 1;
    }
}

changeTurn();

let numRows = "";

for (i = 0; i < boardSize[0];i++) {
    numRows += '1fr ';  
}
numRows = numRows.slice(0,-1);
numRows = numRows + ';';
console.log(numRows);