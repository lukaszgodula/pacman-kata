import { Ball } from '../src/pacman-core/Ball';
import PacMan from '../src/pacman-core/PacMan';

test('basic', () => {
    const pacman = new PacMan();
    expect(pacman.whatAmILike()).toBe('funny');
});

test('has tick method', () => {
    const pacman = new PacMan();
    expect(pacman.tick());
});

test('increase ballCount when eating regular ball', () => {
    const pacman = new PacMan();
    const initialBallCount = pacman.ballCount;
    const ball: Ball = { type: 'regular' };

    pacman.eatBall(ball);

    expect(pacman.ballCount).toBe(initialBallCount + 1);
});

test('increase ballCount when eating super ball', () => {
    const pacman = new PacMan();
    const initialBallCount = pacman.ballCount;
    const ball: Ball = { type: 'super' };

    pacman.eatBall(ball);

    expect(pacman.ballCount).toBe(initialBallCount + 1);
});