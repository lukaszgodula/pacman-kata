class PacMan {
    public lives: number;
    public points: number;
    public level: number;
    public ballCount: number;
    public ghostCount: number;
    public state: string;
    public supeTime: number;

    public whatAmILike(): string {
        return 'funny';
    }

    public tick(): void {

    }
}

export default PacMan;
