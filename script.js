const boardSize = [6,7];
let currentPlayer = 2;
let gamePiece = '';

const arrowIcons = document.querySelector('#arrowIcons');
const gameBoard = document.querySelector('#gameBoard');
const userTurn = document.querySelectorAll('#userTurn p');

for (i = 0; i < boardSize[1]; i++){
    const arrow = document.createElement('img');
    arrow.classList.add(`arrow`);
    arrow.setAttribute('src','Arrow.gif');
    arrow.addEventListener('click', dropPiece);
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
const allSlots = document.querySelectorAll('.slot');

function changeArrowImage (event) {
    if (currentPlayer === 1) {
        event.setAttribute('src','RedPiece.png');
        event.style.filter = 'brightness(100%)';
        setTimeout(()=>{
            event.setAttribute('src','Arrow.gif');
            event.style.filter = 'brightness(20%)';
        },1000)
    } else {
        event.setAttribute('src','BlackPiece.png');
        event.style.filter = 'brightness(100%)';
        setTimeout(()=>{
            event.setAttribute('src','Arrow.gif');
            event.style.filter = 'brightness(20%)';
        },1000)
    }
    
}
function moveImage (index) {
    if (currentPlayer === 1) {
        gamePiece = 'RedPiece.png';
    } else {
        gamePiece = 'BlackPiece.png';
    }
    //for (i = 0; i < boardSize[1]; i++){
        console.log(index);
        change2BlankPiece(index)
        index += boardSize[1];
    
        
            
}
async function change2BlankPiece (index) {
    const wait = await setTimeout(change2GamePiece(index,gamePiece),2000)
    allSlots[index].setAttribute('src', 'BlankPiece.png');
}
function change2GamePiece(index,gamePiece) {
    console.log(allSlots[index])
    allSlots[index].setAttribute('src', gamePiece);
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

function dropPiece () {
    const index = Array.from(event.target.parentElement.children).indexOf(event.target);
    changeArrowImage(event.target);
    moveImage(index);
    setTimeout(changeTurn,2000);

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