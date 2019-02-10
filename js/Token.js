class Token {
    constructor(owner, index ){
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }

    /**
     * Returns the HTML DOM element for the token
     */
    get htmlToken(){
        return document.getElementById(this.id);
    }

    /**
     * Gets left offset of html element.
     * @return  {number}   Left offset of token object's htmlToken.
     */
    get offsetLeft(){
        return this.htmlToken.offsetLeft;
    }

    /**
     * Create HTML element for Token and appends to DOM
     */
    drawHTMLToken(){
        const token = document.createElement('div');
        document.getElementById('game-board-underlay').appendChild(token);
        token.setAttribute('id', this.id);
        token.setAttribute('class', 'token');
        token.style.backgroundColor = this.owner.color;
    }

    /**
     * Moves html token one column to the left
     */
    moveLeft(){
        if(this.columnLocation > 0){
            this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation -= 1;
        }
    }

    /**
     * Move html token one column to the right
     * @param {number} columns - number of columns in game board
     */
    moveRight(columns){
        if(this.columnLocation < columns-1){
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation += 1;
        }
    }

    /**
     * Drops html token into targeted board space.
     * @param target - Targeted space for dropped token
     * @param reset - The reset function to call after animation has completed
     */
    drop(target, reset){
        this.dropped = true;

        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        }, 750, 'easeOutBounce', reset(this) );

    }
}