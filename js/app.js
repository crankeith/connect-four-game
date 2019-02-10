let newGame = new Game();

/**
 * Listens for click on `#begin-game` and calls startGame() on game object
 */

$('#begin-game').on('click', function() {
    newGame.startGame();
    this.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
    document.getElementById('player1-tokens-left').style.opacity = '1';
    document.getElementById('player2-tokens-left').style.opacity = '1';
});

/**
 * Listen for keyboard presses
 */

document.addEventListener('keydown',(event) => {
    newGame.handleKeydown(event)
});

document.querySelector('#game-over button').addEventListener('click', () => {
    const tokens = document.querySelectorAll('[id^=token]');
    for (let i = 0; i < tokens.length; i++){
        tokens[i].remove();
    }
    newGame = new Game();
    newGame.startGame();
    newGame.gameOver(false);
});