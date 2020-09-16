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
    arrow.setAttribute('type','arrow icons')
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
    slot.setAttribute('type','blank image');
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
                userTurn[1].style.border = 'white solid 10px';
                userTurn[1].style.borderRadius = '10px';
                userTurn[1].style.backgroundColor = '#12130f';
                userTurn[1].innerText = 'Player 2 Turn';
                currentPlayer = 2;
                gamePiece = 'BlackPiece.png';
            }
            else if (currentPlayer === 2){
                userTurn[1].style.color = 'white';
                userTurn[1].style.backgroundColor = 'rgb(169, 7, 7)';
                userTurn[1].style.border = 'white solid 10px';
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
                allSlots[index].setAttribute('type',`${gamePiece}`);
            }, holdTime + dropTime);
            //Resets image to blank
            setTimeout(() => {
                allSlots[index].setAttribute('src', 'BlankPiece.png');
                allSlots[index].setAttribute('type','blank image');
            }, holdTime + i * rate + rate); 
        }
        //If current slot is not filled slot change image to current game piece
        if (CurrentNodeVal === 'BlankPiece.png'){
            //changes slot to current gamepiece
            setTimeout(() => {
                allSlots[index].setAttribute('src', gamePiece);
                allSlots[index].setAttribute('type',`${gamePiece}`);
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
                allSlots[index].setAttribute('type',`${gamePiece}`);
            }, holdTime + dropTime);
        }
    }
        
}

//Starts game with player 1's turn
changeTurn();
//event listener function when arrow is clicked
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
        let holdTime = 200;
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
    check4HorizWinner(totalTime);
    checkVertWinner(totalTime);
    checkSlantRightWinner(totalTime);
    checkSlantLeftWinner(totalTime);
}
//for loop to initialize boardVals
let boardVals = []
for (i = 0; i < gameBoard.children.length;i++) {
    boardVals.push(0);
}
//function to set a boardVals equal to the board values (1 = red, 2 = black)
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
//variable for flashing winning message on and off
let onOff = 1;
//function to check for a winner horizontally
function check4HorizWinner (time) {
    //waits for game piece to drop
    setTimeout(() => {
        getBoardValues(); 
        //for loop going through each row of board
        for (i = 0; i < boardSize[0]; i++){
            //for loop going through each column of boar
            for (j = 0; j < boardSize[1]-3; j++){
                k = j + i * boardSize[1]; //variable to run through board
                //if statements to check for four in a row horizontally
                if (boardVals[k] === boardVals[k+1] && boardVals[k] != 0) {
                    if (boardVals[k+1] === boardVals[k+2]) {
                        if (boardVals[k+2] === boardVals[k+3]) {
                            //removes "Turn" from "player 1 (or 2) Turn"
                            const winner = userTurn[1].innerText.slice(0,-5);
                            //checks for winners, runs flashing message function
                            if (winner === 'Player 2') {
                                setInterval(flashRedWinner, 800);
                            }          
                            else {
                                setInterval(flashBlackWinner, 800);
                            }    
                            return;        
                        }
                    }
                }
            }
        }
    }, time);
}
//function to check for a winner horizontally
function checkVertWinner (time) {
    //waits for game piece to drop
    setTimeout(() => {
        getBoardValues(); 
        //for loop going through each row of board (stops 3rd to last)
        for (i = 0; i < boardSize[0]-3; i++){
            //for loop going through each column of board
            for (j = 0; j < boardSize[1]; j++){
                k = j + i * boardSize[1];  //variable to run through board
                //if statements to check for four in a row vertically
                if (boardVals[k] === boardVals[k+boardSize[1]] && boardVals[k] != 0) {
                    if (boardVals[k+boardSize[1]] === boardVals[k+2*boardSize[1]]) {
                        if (boardVals[k+2*boardSize[1]] === boardVals[k+3*boardSize[1]]) {
                            const winner = userTurn[1].innerText.slice(0,-5);
                            if (winner === 'Player 2') {
                                setInterval(flashRedWinner, 800);
                            }          
                            else {
                                setInterval(flashBlackWinner, 800);
                            }    
                            return;        
                        }
                    }
                }
            }
        }
    }, time);
}
//function to check for a winner diagonally right
function checkSlantRightWinner (time) {
    setTimeout(() => {
        getBoardValues(); 
        //for loop going through each row of board, stops 3 from end
        for (i = 0; i < boardSize[0]-3; i++){
            //for loop going through each column of board, stops 3 from end
            for (j = 0; j < boardSize[1]-3; j++){
                k = j + i * boardSize[1];
                //if statements to check for four in a row diagonally right
                if (boardVals[k] === boardVals[k+boardSize[1]+1] && boardVals[k] != 0) {
                    if (boardVals[k+boardSize[1]+1] === boardVals[k+2*boardSize[1]+2]) {
                        if (boardVals[k+2*boardSize[1]+2] === boardVals[k+3*boardSize[1]+3]) {
                            const winner = userTurn[1].innerText.slice(0,-5);
                            if (winner === 'Player 2') {
                                setInterval(flashRedWinner, 800);
                            }          
                            else {
                                setInterval(flashBlackWinner, 800);
                            }    
                            return;        
                        }
                    }
                }
            }
        }
    }, time);
}
//function to check for a winner diagonally left
function checkSlantLeftWinner (time) {
    setTimeout(() => {
        getBoardValues(); 
         //for loop going through each row of board, stops 3 from end
        for (i = 0; i < boardSize[0]-3; i++){
            //for loop going through each column of board, starts at column 3
            for (j = 3; j < boardSize[1]; j++){
                k = j + i * boardSize[1];
                //if statements to check for four in a row diagonally left
                if (boardVals[k] === boardVals[k+boardSize[1]-1] && boardVals[k] != 0) {
                    if (boardVals[k+boardSize[1]-1] === boardVals[k+2*boardSize[1]-2]) {
                        if (boardVals[k+2*boardSize[1]-2] === boardVals[k+3*boardSize[1]-3]) {
                            const winner = userTurn[1].innerText.slice(0,-5);
                            if (winner === 'Player 2') {
                                setInterval(flashRedWinner, 800);
                            }          
                            else {
                                setInterval(flashBlackWinner, 800);
                            }    
                            return;        
                        }
                    }
                }
            }
        }
    }, time);
}
//function used with set interval to flash player 1 wins
function flashRedWinner () {
    if (onOff === 1) {
        message.innerText = `Player 1 Wins!`;
        message.style.backgroundColor = 'rgb(169, 7, 7)';
        message.style.color = 'white';
        message.style.border = 'white solid 10px';
        onOff = 0;
    }
    //informs user to reset game
    else {
        message.innerText = `Reset Game!`;
        message.style.backgroundColor = '#0748e1';
        message.style.color = 'white';
        message.style.border = 'white solid 10px';
        onOff = 1;
    }    
}
//function used with set interval to flash player 2 wins
function flashBlackWinner () {
    if (onOff === 1) {
        message.innerText = `Player 2 Wins!`;
        message.style.backgroundColor = 'black';
        message.style.color = 'white';
        message.style.border = 'white solid 10px';
        onOff = 0;
    }
    //informs user to reset game
    else {
        message.innerText = `Reset Game!`;
        message.style.backgroundColor = '#0748e1';
        message.style.color = 'white';
        message.style.border = 'white solid 10px';
        onOff = 1;
    }    
}
//function to reset game (reloads page)
const reset = document.querySelector('#reset');
reset.addEventListener('click',() => {
    location.reload();
})


