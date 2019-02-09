class Game {
    constructor(){
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
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

    startGame(){

    }
}