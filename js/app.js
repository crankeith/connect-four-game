const newGame = new Game();

/**
 * Listens for click on `#begin-game` and calls startGame() on game object
 */

$('#begin-game').on('click', function() {
    newGame.startGame();
    this.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
});