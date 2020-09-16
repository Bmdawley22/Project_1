# Project_1
Title: Virtual Connect Four

Developer: Brady Dawley

Description: 

The classic Connect Four game is now available on the web. The same two player game with the same look and feel as the classic game.  The game involves two players that alternate turns until the game is won.  The object of the game is for a player to connect four game pieces in a row either horizonantally, vertically, or diagonally. Gravity will be present on the screen to present the same feel as the original game. The user selects (clicks) the column they wish to drop the piece and the piece will drop to the correct slot 

WireFrame:
WireFrame.png

Project Link:
https://bmdawley22.github.io/bmdawley.github.io/

Minimal Viable Product Goals:
    - Display Board
    - Switch user function
    - Display arrow icons on for columns to drop game piece
    - Have some kind of display for the game piece dropping 
    - Have winning functionality with message

Post-MVP Goals:
    - Add a different shaped board (user chooses between normal and non-normal shape)
    - Add additonal boundaries/barriers to make game more interesting 

Technologies Used:
    - Command Line: commanded communcations to the computer for file creation, file navigation, and repository commands
    - Source Control: to track changes made and a have a log of project iterations
    - Virtual Studio Code: coded HTML, CSS, and Javascript documents here
    - Google Chrome Web Browser and Developer Tools: used to display index.html, also used for code output
    - GitHub Pages: used to create public URL for my project

Main Game Features:

- Reset Button when user desires to restart game
- Game message box (flashes win game is won)
- User turn message box (changes after piece is dropped)
- Game board designed to replicate the real life game

Approach:

Creating game board:

Was created using a grid styling and using a blank image with a rounded border to imitate a slot in the real game

Selecting column to drop game piece in:

Implemented an arrow down Gif to indicate for the user to click on and choose their desired column

Dropping game piece:

Once the arrow is clicked, I ran a function to get the indexes of the slot elements for that column only.  I then updated the pictures of that row to show the game piece dropping using timeout functions for animation.

Selecting winner:

First I ran a function to get baord value for each slot (1 = red game piece, 2 = black game piece).  Then I created separate functions for checking for four in a row horizontally, vertically, diagonally down, and diagonally up.

Unsolved Issues: 

If a user clicks before the previous piece has finished dropping, the game piece does not change and the game does not function correctly
