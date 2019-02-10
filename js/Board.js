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

        for(let x = 0; x < this.columns; x++){
            const column = [];

            for(let y = 0; y < this.rows; y++) {
                column.push(new Space(x, y))
            }

            spaces.push(column);
        }
        return spaces;
    }

    /**
     * Loop through the spaces array and call the drawSVGSpace method
     */
    drawHTMLBoard(){
        for(let column of this.spaces){
            for(let space of column) {
                space.drawSVGSpace();
            }
        }
    }
}