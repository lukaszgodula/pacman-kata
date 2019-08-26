import { Ball } from './Ball';
import { Ghost } from './Ghost';
import { GhostsStatistics } from './GhostsStatistics';
import { Grid } from './Grid';
import { Direction } from './Direction.enum';
import { PacManState } from './PacManState.enum';
import { Point } from './Point';

class PacMan {
	public lives: number;
	public points: number = 0;
	public level: number = 0;
	public ballCount: number = 0;
	public ghostStatistics: GhostsStatistics = new GhostsStatistics();
	public state: PacManState = null;
	public superTime: number = 0;
	public direction: Direction = null;

	public grid: Grid;

	constructor(grid?: Grid) {
		this.grid = grid;
	}

	public whatAmILike(): string {
		return 'funny';
	}

	public tick(): void {
		this.superTime = Math.max(0, this.superTime - 1);
		if (this.superTime === 0) {
			this.state = PacManState.Regular;
		}
		switch (this.direction) {
			case Direction.Down:
				this.tryMoveTo({ y: this.grid.pacmanPosition.y - 1 });
				break;
			case Direction.Left:
				this.tryMoveTo({ x: this.grid.pacmanPosition.x - 1 });
				break;
			case Direction.Right:
				this.tryMoveTo({ x: this.grid.pacmanPosition.x + 1 });
				break;
			case Direction.Up:
				this.tryMoveTo({ y: this.grid.pacmanPosition.y + 1 });
				break;
		}
	}

	public eatBall(ball: Ball): void {
		this.ballCount++;
		if (this.ballCount === 40) {
			this.ballCount = 0;
			this.level++;
		}
		if (ball.type === 'super') {
			this.state = PacManState.Super;
			this.superTime = 10;
		}
	}

	public eatGhost(ghost: Ghost): void {
		if (this.state === PacManState.Super) {
			this.points = this.points + 10;
			this.ghostStatistics.increaseCountFor(ghost);
		} else if (this.state === PacManState.Regular) {
			this.lives--;
		}

		if (this.lives === 0) {
			this.points = 0;
		}
	}

	public rotate(direction: Direction): void {
		this.direction = direction;
	}

	private tryMoveTo(changedCoordinates: Partial<Point>): void {
		const destination = { ...this.grid.pacmanPosition, ...changedCoordinates };
		if (this.canMoveTo(destination)) {
			this.grid.pacmanPosition = destination;
		}
	}

	private canMoveTo(point: Point): boolean {
		return this.grid.obstaclesPositions.find(p => p.x === point.x && p.y === point.y) === undefined;
	}
}

export default PacMan;
