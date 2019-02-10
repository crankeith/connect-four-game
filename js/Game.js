class Game {
    constructor(){
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }

    /**
     * Gets the active player
     * @returns {Object} - player - The active player
     */
    get activePlayer(){
        return this.players.find(player => player.isActive)
    }

    /**
     * Create two player objects
     * @returns {Array}
     */
    createPlayers(){
        return [
            new Player(1,'Player 1','#e15258', true),
            new Player(2,'Player 2','#e59a13')
        ];
    };

    /**
     * Gets game ready for play
     */
    startGame(){
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
        this.players.map(player => this.updateTokensLeft(player));
        const p2TokensLeft = document.querySelector('#player2-tokens-left span');
        p2TokensLeft.textContent = this.players[1].unusedTokens.length;
    }

    playToken(){
        const spaces = this.board.spaces;
        const activeToken = this.activePlayer.activeToken;
        const activeColumnSpaces = spaces[activeToken.columnLocation];
        const availableSpaces = activeColumnSpaces.filter(space => !space.token);
        const targetSpace = availableSpaces[availableSpaces.length-1];

        if(availableSpaces.length > 0){
            const game = this;
            game.ready = false;
            activeToken.drop(targetSpace, () => {
                game.updateGameState(activeToken, targetSpace);
            });
        }
    }

    /**
     * Updates game state after token is dropped.
     * @param   {Object}  token  -  The token that's being dropped.
     * @param   {Object}  target -  Targeted space for dropped token.
     */
    updateGameState(token, target){
        target.mark(token);
        this.updateTokensLeft(this.activePlayer);

        if( this.checkForWin(target) ) {
            this.gameOver(true,`${this.activePlayer.name} is the winner!`)
        } else {
            this.changeActivePlayer();
            if ( this.activePlayer.checkTokens() ){
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true;
            } else {
                this.gameOver(true,`No tokens left.`)

            }
        }
    }


    /**
     * Iterate through players and switch active one
     */
    changeActivePlayer(){
        this.players.map(player => player.isActive = !player.isActive);
    }



    /**
     * Checks if there a winner on the board after each token drop.
     * @param   {Object}   target - Targeted space for dropped token.
     * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
     */

    checkForWin(target){
        const owner = target.token.owner;
        let win = false;

        // vertical
        for (let x = 0; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
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

        // diagonal
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


    /**
     * Branches code, depending on what key player presses
     * @param {Object} event - Keydown event object
     */
    handleKeydown(event){
        if(this.ready){
            if(event.key === 'ArrowDown'){
                //Token is "dropped" into a column at the lowest row intersection possible
                this.playToken();
            } else if(event.key === 'ArrowLeft'){
                //Token moves left to the next column unless it's at the left most column, then nothing
                this.activePlayer.activeToken.moveLeft();
            } else if(event.key === 'ArrowRight'){
                //Token moves right to the next column unless it's at the right most column, then nothing
                this.activePlayer.activeToken.moveRight(this.board.columns);
            }
        }
    }

    updateTokensLeft(player){
        document.querySelector('#player' + player.id + '-tokens-left span').textContent = player.unusedTokens.length;
    }

    /**
     * Displays game over message
     * @param {Boolean} display - Hide/Show game over message
     * @param {String} msg - The message to display in the UI
     */
    gameOver(display, msg = '') {
        const gameOverDiv = document.querySelector('#game-over');
        const gameOverSpan = document.querySelector('#game-over span');
        if (display) {
            gameOverSpan.textContent = msg;
            gameOverDiv.style.display = 'block';
        } else {
            gameOverDiv.style.display = 'none';
        }
    }
}