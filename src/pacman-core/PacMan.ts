import { Ball } from './Ball';
import { PacManState } from './PacManState.enum';

class PacMan {
    public lives: number;
    public points: number;
    public level: number = 0;
    public ballCount: number = 0;
    public ghostCount: number;
    public state: PacManState = null;
    public superTime: number = 0;

    public whatAmILike(): string {
        return 'funny';
    }

    public tick(): void {
        this.superTime = Math.max(0, this.superTime - 1);
        if (this.superTime === 0) {
            this.state = PacManState.Regular;
        }
    }

    eatBall(ball: Ball) {
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
}

export default PacMan;
