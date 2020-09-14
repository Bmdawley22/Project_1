//Initialize board size, current player, and gamePiece variables
const boardSize = [6,7];
let currentPlayer = 2;
let gamePiece = '';
//Initializes variables for arrow icons, gameboard, and user turn nodes
const arrowIcons = document.querySelector('#arrowIcons');
const gameBoard = document.querySelector('#gameBoard');
const userTurn = document.querySelectorAll('#userTurn p');
//Adds arrow icons above game board for each column
for (i = 0; i < boardSize[1]; i++){
    const arrow = document.createElement('img');
    arrow.classList.add(`arrow`);
    arrow.setAttribute('src','Arrow.gif');
    arrow.addEventListener('click', dropPiece);
    arrowIcons.appendChild(arrow);
    arrow.style.gridRow = "1";
    arrow.style.gridColumn = `${i+1}`;
}
//Adds slot for each space in the gameboard
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
//Initializes variable for slot nodes
let allSlots = document.querySelectorAll('.slot');
//Changes arrow image to current player gamepiece where user clicks
function changeArrowImage (event, gamePiece, holdTime) {
    event.setAttribute('src','RedPiece.png');
    event.style.filter = 'brightness(100%)';
    setTimeout(()=>{
        event.setAttribute('src','Arrow.gif');
        event.style.filter = 'brightness(20%)';
    },holdTime)   
}

function changeTurn () {
    if (currentPlayer === 1) {
        userTurn[0].style.color = '#12130f';
        userTurn[0].style.backgroundColor = '#12130f';
        userTurn[0].style.border = '#12130f';

        userTurn[1].style.color = 'white';
        userTurn[1].style.border = 'grey solid 5px';
        userTurn[1].style.borderRadius = '10px';
        currentPlayer = 2;
        gamePiece = 'BlackPiece.png';
    }
    else if (currentPlayer === 2){
        userTurn[1].style.color = '#12130f';
        userTurn[1].style.border = '#12130f';

        userTurn[0].style.color = 'white';
        userTurn[0].style.backgroundColor = 'rgb(169, 7, 7)';
        userTurn[0].style.border = 'grey solid 5px';
        userTurn[0].style.borderRadius = '10px';
        currentPlayer = 1;
        gamePiece = 'RedPiece.png';
    }
}
//Changes images as gamepiece is dropped
function change2GamePiece(index, i, gamePiece, holdTime, dropTime, rate) {
    let lagTime = 20;
    console.log(holdTime + dropTime, holdTime + i * rate + rate);
    setTimeout(() => {
        allSlots[index].setAttribute('src', gamePiece);
    }, holdTime + dropTime);
    setTimeout(() => {
        allSlots[index].setAttribute('src', 'BlankPiece.png');
    }, holdTime + i * rate + rate); 
}

//Starts game with player 1's turn
changeTurn();

function dropPiece () {
    const index = Array.from(event.target.parentElement.children).indexOf(event.target);
    if (currentPlayer === 1) {
        gamePiece = 'RedPiece.png';
    } else {
        gamePiece = 'BlackPiece.png';
    }
    let indexArr = [];
    indexArr.push(index);
    for (i = 1; i < boardSize[1]; i++){  
        indexArr.push(indexArr[i-1] + boardSize[1]); 
    }
    let holdTime = 1000;
    changeArrowImage(event.target,gamePiece, holdTime);
    let rate = 100;
    let dropTime = 0;
    for (i = 0; i < (indexArr.length - 1); i++){
        change2GamePiece(indexArr[i], i, gamePiece, holdTime, dropTime ,rate);
        dropTime += rate;
    }
    console.log(currentPlayer);
    changeTurn();   
}



/*
let numRows = "";

for (i = 0; i < boardSize[0];i++) {
    numRows += '1fr ';  
}
numRows = numRows.slice(0,-1);
numRows = numRows + ';';
console.log(numRows);
*/

