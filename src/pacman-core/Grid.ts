import { Point } from './Point';
import { Ghost } from './Ghost';

export class Grid {
	public pacmanPosition: Point;
	public obstaclesPositions: Point[];
	public ghostsPositions: Map<string, Point> = new Map<string, Point>();

	constructor() {
		this.pacmanPosition = { x: 0, y: 0 };
		this.obstaclesPositions = [];
	}

	public getGhostPosition(ghost: Ghost): Point {
		return this.ghostsPositions.get(ghost.name);
	}

	public setGhostPosition(ghost: Ghost, position: Point): void {
		this.ghostsPositions.set(ghost.name, position);
	}
}