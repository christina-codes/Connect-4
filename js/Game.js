class Game {
  constructor() {
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
  }

    get activePlayer() {
      return this.players.find(player => player.active);
    }

    /* Creates two player objects
    * @return  {array}  An array of two player objects.
    */
    createPlayers() {
      const players = [
        new Player('Player 1', 1, '#e15258', true),
        new Player('Player 2', 2, '#e59a13')
      ];
      return players;
    }

    startGame() {
      this.board.drawHTMLBoard();
      this.activePlayer.activeChecker.drawHTMLChecker();
      this.ready = true;
    }

    /* Branches code, depending on what key player presses
    * @param   {Object}    e - Keydown event object */
     handleKeyDown(e) {
       if (this.ready) {
         if (e.key === "ArrowLeft") {
           this.activePlayer.activeChecker.moveLeft();
         } else if (e.key === "ArrowRight") {
           this.activePlayer.activeChecker.moveRight(this.board.columns);
         } else if (e.key === "ArrowDown") {
           this.playChecker();
         }
       }
     }

     playChecker() {
       let spaces = this.board.spaces;
       let activeChecker = this.activePlayer.activeChecker;
       let targetColumn = spaces[activeChecker.columnLocation];
       let targetSpace = null;

       for (let space of targetColumn) {
         if (space.checker === null) {
           targetSpace = space;
         }
       }

       if (targetSpace !== null) {
         const currentGame = this;
         currentGame.ready = false;
         activeChecker.drop(targetSpace, () => {
           currentGame.updateGameState(activeChecker, targetSpace);
         });
       }
     }

     // Checks if there a winner on the board after each checker drop
     checkForWin(target) {
       const owner = target.checker.owner;
       let win = false;

       // vertical
       for (let x = 0; x < this.board.columns; x++) {
         for (let y = 0; y < this.board.rows - 3; y++ ) {
           if (this.board.spaces[x][y].owner === owner &&
               this.board.spaces[x][y+1].owner === owner &&
               this.board.spaces[x][y+2].owner === owner &&
               this.board.spaces[x][y+3].owner === owner) {
                 win = true;
               }
           }
       }

       // horizontal
       for (let x = 0; x < this.board.columns - 3; x++ ){
           for (let y = 0; y < this.board.rows; y++){
               if (this.board.spaces[x][y].owner === owner &&
                   this.board.spaces[x+1][y].owner === owner &&
                   this.board.spaces[x+2][y].owner === owner &&
                   this.board.spaces[x+3][y].owner === owner) {
                       win = true;
               }
           }
       }

       // diagonal
       for (let x = 3; x < this.board.columns; x++ ){
          for (let y = 0; y < this.board.rows - 3; y++){
              if (this.board.spaces[x][y].owner === owner &&
                  this.board.spaces[x-1][y+1].owner === owner &&
                  this.board.spaces[x-2][y+2].owner === owner &&
                  this.board.spaces[x-3][y+3].owner === owner) {
                      win = true;
              }
          }
      }

      // reverse diagonal
      for (let x = 3; x < this.board.columns; x++ ){
           for (let y = 3; y < this.board.rows; y++){
               if (this.board.spaces[x][y].owner === owner &&
                   this.board.spaces[x-1][y-1].owner === owner &&
                   this.board.spaces[x-2][y-2].owner === owner &&
                   this.board.spaces[x-3][y-3].owner === owner) {
                       win = true;
               }
           }
       }

      return win;
     }

     switchPlayers() {
       for (let player of this.players) {
         player.active = player.active === true ? false : true;
       }
     }

     gameOver(message) {
       const gameOverDiv = document.querySelector('#game-over');
       const playAgain = document.querySelector('#reset');
       gameOverDiv.style.display = 'block';
       playAgain.style.display = 'block';
       gameOverDiv.textContent = message;
     }

     // Updates game state after checker is dropped
     updateGameState(checker, target) {
       target.mark(checker);
       if (!this.checkForWin(target)) {
         this.switchPlayers();
         if (this.activePlayer.checkCheckers()) {
           this.activePlayer.activeChecker.drawHTMLChecker();
           this.ready = true;
         } else {
           this.gameOver('No more checkers!');
         }
       } else {
         this.gameOver(`${target.owner.name} wins!`);
       }
     }
  }
