//Initialize board size, current player, and gamePiece variables
const boardSize = [6,7];
let currentPlayer = 2;
let gamePiece = '';
//Initializes variables for arrow icons, gameboard, and user turn nodes
const arrowIcons = document.querySelector('#arrowIcons');
const gameBoard = document.querySelector('#gameBoard');
const userTurn = document.querySelectorAll('#userTurn p');
const message = document.querySelector('#message');
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
    event.setAttribute('src',gamePiece);
    event.style.filter = 'brightness(100%)';
    setTimeout(()=>{
        event.setAttribute('src','Arrow.gif');
        event.style.filter = 'brightness(20%)';
    },holdTime)   
}
//function to change turn (user turn icon, currentPlayer variable, current game piece)
function changeTurn (totalTime) {
        
        //Gives time delay to change the user turn
        setTimeout(() => {
            
            if (currentPlayer === 1) {
                userTurn[1].style.color = 'white';
                userTurn[1].style.border = 'grey solid 10px';
                userTurn[1].style.borderRadius = '10px';
                userTurn[1].style.backgroundColor = '#12130f';
                userTurn[1].innerText = 'Player 2 Turn';
                currentPlayer = 2;
                gamePiece = 'BlackPiece.png';
            }
            else if (currentPlayer === 2){
                userTurn[1].style.color = 'white';
                userTurn[1].style.backgroundColor = 'rgb(169, 7, 7)';
                userTurn[1].style.border = 'grey solid 10px';
                userTurn[1].style.borderRadius = '10px';
                userTurn[1].innerText = 'Player 1 Turn';
                currentPlayer = 1;
                gamePiece = 'RedPiece.png';
            }
        }, totalTime);     
}
//Changes images as gamepiece is dropped
function change2GamePiece(index, i, gamePiece, holdTime, dropTime, rate) {
    //Sets variable equal to node for the current 
    let CurrentNodeVal = allSlots[index].attributes[1].nodeValue;
    //If not on last row of game board 
    if (allSlots[index+boardSize[1]] !== undefined) {
        //Sets variable equal to node for the slot below current
        let nextNodeVal = allSlots[index+boardSize[1]].attributes[1].nodeValue;
        //If slot below is not filled with a game piece
        if (nextNodeVal !== 'RedPiece.png' && nextNodeVal !== 'BlackPiece.png'){
            //Sets current slot to current gamePiece
            setTimeout(() => {
                allSlots[index].setAttribute('src', gamePiece);
            }, holdTime + dropTime);
            //Resets image to blank
            setTimeout(() => {
                allSlots[index].setAttribute('src', 'BlankPiece.png');
            }, holdTime + i * rate + rate); 
        }
        //If current slot is not filled slot change image to current game piece
        if (CurrentNodeVal === 'BlankPiece.png'){
            //changes slot to current gamepiece
            setTimeout(() => {
                allSlots[index].setAttribute('src', gamePiece);
            }, holdTime + dropTime);
        }
    }
    //If on the last row of game board
    else {
        //if bottom row of current column isn't a gamepiece
        if (CurrentNodeVal === 'BlankPiece.png'){
            //changes slot to current gamepiece
            setTimeout(() => {
                allSlots[index].setAttribute('src', gamePiece);
            }, holdTime + dropTime);
        }
    }
        
}

//Starts game with player 1's turn
changeTurn();
//event listner function when arrow is clicked
function dropPiece () {
    //gets slot index where piece is dropped
    const index = Array.from(event.target.parentElement.children).indexOf(event.target);
    //sets gamePiece variable equal to the current player's game piece
    if (currentPlayer === 1) {
        gamePiece = 'RedPiece.png';
    } else {
        gamePiece = 'BlackPiece.png';
    }
    //creates array of the indexes for the column where the piece is dropped
    let indexArr = [];
    indexArr.push(index);
    for (i = 1; i < boardSize[1]; i++){  
        indexArr.push(indexArr[i-1] + boardSize[1]); 
    }
    let totalTime = 0;
    //if statement to check if the user clicked on a filled column
    if (allSlots[indexArr[0]].attributes[1].nodeValue === 'BlankPiece.png'){
        //hold time is the the time the game piece image is shown above the column clicked
        let holdTime = 400;
        changeArrowImage(event.target,gamePiece, holdTime);
        let rate = 60;  //time each image is shown in each slot of the dropped column
        let dropTime = 0;  //time set in setTimeout for changing image
        //shows game piece dropping down column selected
        for (i = 0; i < (indexArr.length - 1); i++){
            change2GamePiece(indexArr[i], i, gamePiece, holdTime, dropTime ,rate);
            dropTime += rate;
        }
        totalTime = holdTime + dropTime; //total time the drop took
    } else {
        //message for when user clicks a filled row
        message.innerText = 'Column is full! Cannot place piece there!';
        message.style.color = 'rgb(169, 7, 7)';
        message.style.border = 'rgb(169, 7, 7) solid 8px';
        //changes image back to arrows where user clicked
        setTimeout(() => {
            message.innerText = 'Click arrows to drop game piece!';
            message.style.color = 'black';
            message.style.border = 'grey solid 8px';
        }, 2000);
    }  
    changeTurn(totalTime);
    check4HorizWinner(totalTime + 200);
    checkVertWinner(totalTime + 100);
    checkSlantRightWinner(totalTime + 200);
}
let boardVals = []
for (i = 0; i < gameBoard.children.length;i++) {
    boardVals.push(0);
}
function getBoardValues ()  {
    for (i = 0; i < gameBoard.children.length;i++){
        if (allSlots[i].attributes[1].nodeValue === 'RedPiece.png') {
            boardVals[i] = 1;
        }
        else if (allSlots[i].attributes[1].nodeValue === 'BlackPiece.png') {
            boardVals[i] = 2;
        } 
    }
    
}
function check4HorizWinner (time) {
    setTimeout(() => {
        getBoardValues(); 
        for (i = 0; i < boardSize[0]; i++){
            for (j = 0; j < boardSize[1]-3; j++){
                k = j + i * boardSize[1];
                if (boardVals[k] === boardVals[k+1] && boardVals[k] != 0) {
                    if (boardVals[k+1] === boardVals[k+2]) {
                        if (boardVals[k+2] === boardVals[k+3]) {
                            const winner = userTurn[1].innerText.slice(0,-5);
                            if (winner === 'Player 2') {
                                message.innerText = `Player 1 Wins!`;
                                message.style.color = 'rgb(169, 7, 7)';
                                message.style.border = 'rgb(169, 7, 7) solid 10px';
                            }          
                            else {
                                message.innerText = `Player 2 Wins!`;
                                message.style.border = 'black solid 8px';
                                message.style.color = 'black';
                            }    
                            return;        
                        }
                    }
                }
            }
        }
    }, time);
}
function checkVertWinner (time) {
    setTimeout(() => {
        getBoardValues(); 
        for (i = 0; i < boardSize[0]-3; i++){
            for (j = 0; j < boardSize[1]; j++){
                k = j + i * boardSize[1];
                if (boardVals[k] === boardVals[k+boardSize[1]] && boardVals[k] != 0) {
                    if (boardVals[k+boardSize[1]] === boardVals[k+2*boardSize[1]]) {
                        if (boardVals[k+2*boardSize[1]] === boardVals[k+3*boardSize[1]]) {
                            const winner = userTurn[1].innerText.slice(0,-5);
                            if (winner === 'Player 2') {
                                message.innerText = `Player 1 Wins!`;
                                message.style.color = 'rgb(169, 7, 7)';
                                message.style.border = 'rgb(169, 7, 7) solid 10px';
                            }          
                            else {
                                message.innerText = `Player 2 Wins!`;
                                message.style.border = 'black solid 8px';
                                message.style.color = 'black';
                            }    
                            return;        
                        }
                    }
                }
            }
        }
    }, time);
}
function checkSlantRightWinner (time) {
    setTimeout(() => {
        getBoardValues(); 
        for (i = 0; i < boardSize[0]-3; i++){
            for (j = 0; j < boardSize[1]-3; j++){
                k = j + i * boardSize[1];
                if (boardVals[k] === boardVals[k+boardSize[1]+1] && boardVals[k] != 0) {
                    if (boardVals[k+boardSize[1]+1] === boardVals[k+2*boardSize[1]+2]) {
                        if (boardVals[k+2*boardSize[1]+2] === boardVals[k+3*boardSize[1]+3]) {
                            const winner = userTurn[1].innerText.slice(0,-5);
                            if (winner === 'Player 2') {
                                message.innerText = `Player 1 Wins!`;
                                message.style.color = 'rgb(169, 7, 7)';
                                message.style.border = 'rgb(169, 7, 7) solid 10px';
                            }          
                            else {
                                message.innerText = `Player 2 Wins!`;
                                message.style.border = 'black solid 8px';
                                message.style.color = 'black';
                            }    
                            return;        
                        }
                    }
                }
            }
        }
    }, time);
}



