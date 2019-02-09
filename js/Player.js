class Player {
    constructor(id, name, color, isActive = false){
        this.id = id;
        this.name = name;
        this.color = color;
        this.tokens = this.createTokens(21);
        this.isActive = isActive;
    }

    /**
     * Creates token objects for player
     * @param   {int}   num - Number of token objects to be created
     * @return  {array}     tokens - an array of new token objects
     */

    createTokens(num){
        const tokens = [];

        for(let i = num; i > 0; i --){
            tokens.push(new Token(this, i))
        }

        return tokens;
    }
}