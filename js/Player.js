class Player {
    constructor(id, name, color, isActive = false){
        this.id = id;
        this.name = name;
        this.color = color;
        this.tokens = this.createTokens(21);
        this.isActive = isActive;
    }

    /**
     * Gets the tokens that have not been dropped yet
     * @returns {Array} tokens - an array of tokens with dropped = false
     */
    get unusedTokens(){
        return this.tokens.filter( token => !token.dropped)
    }

    /**
     * Gets the first token in unused tokens for the player
     * @returns {Object} - token - The first token object in the unused tokens array
     */
    get activeToken(){
        return this.unusedTokens[0];
    }

    /**
     * Creates token objects for player
     * @param   {int}   num - Number of token objects to be created
     * @return  {array}     tokens - an array of new token objects
     */
    createTokens(num){
        const tokens = [];

        for(let i = 0; i < num; i ++){
            tokens.push(new Token(this, i))
        }

        return tokens;
    }

    /**
     * Check if a player has any undropped tokens left
     * @return {Boolean}
     */

    checkTokens(){
        return this.unusedTokens.length > 0;
    }
}