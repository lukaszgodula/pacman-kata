import { Ball } from './Ball';
import { Ghost } from './Ghost';
import { GhostsStatistics } from './GhostsStatistics';
import { Grid } from './Grid';
import { PacManDirection } from './PacManDirection.enum';
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
    public direction: PacManDirection = null;

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
            case PacManDirection.Down:
                const destination = { x: this.grid.pacmanPosition.x, y: this.grid.pacmanPosition.y - 1 };
                if (this.canMoveTo(destination)) {
                    this.grid.pacmanPosition = destination;
                }
        }
    }

    public eatBall(ball: Ball) {
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

    public eatGhost(ghost: Ghost) {
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

    private canMoveTo(point: Point): boolean {
        return this.grid.obstaclesPositions.find(p => p.x === point.x && p.y === point.y) === undefined;
    }
}

export default PacMan;
