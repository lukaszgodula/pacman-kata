import { Point } from './Point';

export class Grid {
    public pacmanPosition: Point;

    constructor() {
        this.pacmanPosition = { x: 0, y: 0 };
    }
}