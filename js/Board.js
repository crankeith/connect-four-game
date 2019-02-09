class Board {
    constructor(){
        this.rows = 6;
        this.columns = 7;
        this.spaces = this.createSpaces(this.rows , this.columns);
    }

    /**
     * Creates a 2D array of space objects
     * @returns {Array} spaces - an array of new space objects
     */

    createSpaces(){
        const spaces = [];

        for(let x = this.rows; x > 0; x--){
            const column = [];

            for(let y = this.columns; y > 0; y--) {
                column.push(new Space(x, y))
            }

            spaces.push(column);
        }

        return spaces;
    }
}