import { Ball } from './Ball';
import { Ghost } from './Ghost';
import { PacManState } from './PacManState.enum';

class PacMan {
    public lives: number;
    public points: number = 0;
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
        } else if (this.state === PacManState.Regular) {
            this.lives--;
        }

        if (this.lives === 0) {
            this.points = 0;
        }
    }
}

export default PacMan;
