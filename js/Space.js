class Space {
    constructor(x, y, id){
        this.x = x;
        this.y = y;
        this.id = `space-${x}-${y}`;
        this.token = null;
    }
}