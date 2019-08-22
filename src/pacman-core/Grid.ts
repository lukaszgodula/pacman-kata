import { Point } from './Point';

export class Grid {
    public pacmanPosition: Point;
    public obstaclesPositions: Point[];

    constructor() {
        this.pacmanPosition = { x: 0, y: 0 };
        this.obstaclesPositions = [];
    }
}