import { Ball } from '../src/pacman-core/Ball';
import PacMan from '../src/pacman-core/PacMan';
import { PacManState } from '../src/pacman-core/PacManState.enum';

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

test('reset ballCount and increase level when reaching 40 ballCount', () => {
    const pacman = new PacMan();
    const ball: Ball = { type: 'regular' };

    for (let i = 0; i < 40; i++) {
        pacman.eatBall(ball);
    }

    expect(pacman.ballCount).toBe(0);
    expect(pacman.level).toBe(1);
});

test('if the ball is of ball type super, the Pac-Man state should change to super and set super time to 10', () => {
    const pacman = new PacMan();
    const ball: Ball = { type: 'super' };

    pacman.eatBall(ball);

    expect(pacman.state).toBe(PacManState.Super);
    expect(pacman.superTime).toBe(10);
});

test('if the ball is of ball type regular, the Pac-Man state should stay null and super time should not be 10', () => {
    const pacman = new PacMan();
    const ball: Ball = { type: 'regular' };

    pacman.eatBall(ball);

    expect(pacman.state).toBe(null);
    expect(pacman.superTime).not.toBe(10);
});

test('if the Pac-Man state is super, super time should be decreased by 1 on each tick (if zero then return to the regular state);', () => {
    const pacman = new PacMan();
    const tickCount: number = 10;

    pacman.state = PacManState.Super;
    pacman.superTime = tickCount;

    for (let i = 0; i < tickCount; i++) {
        const actualSuperTime = pacman.superTime;
        pacman.tick();
        expect(pacman.superTime).toBe(actualSuperTime - 1);
    }

    expect(pacman.state).toBe(PacManState.Regular);
});

