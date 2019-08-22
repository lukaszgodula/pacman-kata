import { Ball } from './Ball';

class PacMan {
    public lives: number;
    public points: number;
    public level: number;
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
    }
}

export default PacMan;
