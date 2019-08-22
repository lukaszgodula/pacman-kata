import { Ball } from './Ball';

class PacMan {
    public lives: number;
    public points: number;
    public level: number = 0;
    public ballCount: number = 0;
    public ghostCount: number;
    public state: string;
    public supeTime: number;

    public whatAmILike(): string {
        return 'funny';
    }

    public tick(): void {

    }

    eatBall(ball: Ball) {
        this.ballCount++;
        if (this.ballCount === 40) {
            this.ballCount = 0;
            this.level++;
        }
    }
}

export default PacMan;
