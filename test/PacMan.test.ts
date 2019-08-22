import PacMan from '../src/pacman-core/PacMan';

test('basic', () => {
    const pacman = new PacMan();
    expect(pacman.whatAmILike()).toBe('funny');
});

test('has tick method', () => {
    const pacman = new PacMan();
    expect(pacman.tick());
});