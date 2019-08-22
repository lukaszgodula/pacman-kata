import { Ball } from '../src/pacman-core/Ball';
import { Ghost } from '../src/pacman-core/Ghost';
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

test('if the Pac-Man state is super eating a ghost should increase points by 10,', () => {
    const pacman = new PacMan();
    pacman.state = PacManState.Super;
    const anyGhost: Ghost = { name: 'any' };
    const initialPoints = pacman.points;

    pacman.eatGhost(anyGhost);

    expect(pacman.points).toBe(initialPoints + 10);
});

test('if the Pac-Man state is regular eating a ghost should decrease lives by 1', () => {
    const pacman = new PacMan();
    pacman.state = PacManState.Regular;
    pacman.lives = 5;
    const anyGhost: Ghost = { name: 'any' };
    const initialLives = pacman.lives;

    pacman.eatGhost(anyGhost);

    expect(pacman.lives).toBe(initialLives - 1);
});

test('if the Pac-Man has zero lives left, eating a ghost should reset points to zero', () => {
    const pacman = new PacMan();
    pacman.lives = 1;
    pacman.state = PacManState.Regular;
    const anyGhost: Ghost = { name: 'any' };

    pacman.eatGhost(anyGhost);

    expect(pacman.points).toBe(0);
    expect(pacman.lives).toBe(0);
});

test('eating a ghost while pacman state is super should increase the total ghost count by 1', () => {
    const pacman = new PacMan();
    const anyGhost: Ghost = { name: 'any' };
    const initialGhostCount = pacman.ghostStatistics.getTotal();
    pacman.state = PacManState.Super;

    pacman.eatGhost(anyGhost);

    expect(pacman.ghostStatistics.getTotal()).toBe(initialGhostCount + 1);
});

test('eating a ghost while pacman state is super should increase the particular ghost count by 1', () => {
    const pacman = new PacMan();
    const theGhost: Ghost = { name: 'particular' };
    const initialGhostCount = pacman.ghostStatistics.getCountFor(theGhost.name);
    pacman.state = PacManState.Super;

    pacman.eatGhost(theGhost);

    expect(pacman.ghostStatistics.getCountFor(theGhost.name)).toBe(initialGhostCount + 1);
});