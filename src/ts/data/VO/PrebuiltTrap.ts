export default class PrebuiltTrap {
    type: string;
    row: number;
    col: number;
    fieldIndex: number;
    tier: number;
    direction: string;
    constructor(type: string, row: number, col: number, fieldIndex: number, tier: number, direction: string) {
        this.type = type;
        this.row = row;
        this.col = col;
        this.fieldIndex = fieldIndex;
        this.tier = tier;
        this.direction = direction;
    }
}
