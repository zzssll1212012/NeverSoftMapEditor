export default class Decoration {
    type: string;
    row: number;
    col: number;
    rotation: number;
    constructor(type: string, row: number, col: number, rotation: number) {
        this.type = type;
        this.row = row;
        this.col = col;
        this.rotation = rotation;
    }
}
