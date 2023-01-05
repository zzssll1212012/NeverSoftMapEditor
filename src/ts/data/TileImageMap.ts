import BasePos from "./VO/BasePos";

export default class TileImageMap {

    public static MapData: Map<string, BasePos> = new Map([
        ["0", new BasePos(0, 0)],
        ["1", new BasePos(0, 1)],
        ["2", new BasePos(0, 2)],
        ["3", new BasePos(0, 3)],
        ["5", new BasePos(0, 5)],
        ["9", new BasePos(0, 9)],
        ["@", new BasePos(1, 0)],
        ["#", new BasePos(1, 1)],
        [">", new BasePos(2, 0)],
        ["<", new BasePos(2, 1)],
        ["^", new BasePos(2, 2)],
        ["V", new BasePos(2, 3)],
        ["}", new BasePos(3, 0)],
        ["{", new BasePos(3, 1)],
        ["M", new BasePos(3, 2)],
        ["W", new BasePos(3, 3)],
        ["A", new BasePos(4, 0)],
        ["B", new BasePos(4, 0)],
        ["C", new BasePos(4, 0)],
        ["D", new BasePos(4, 0)],
    ]);

}