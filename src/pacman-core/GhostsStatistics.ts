import { Ghost } from './Ghost';

export class GhostsStatistics {
    private counts: Map<string, number> = new Map<string, number>();

    public getTotal(): number {
        return Array.from(this.counts.values()).reduce((x, y) => x + y, 0);
    }

    public increaseCountFor(ghost: Ghost): void {
        const key = ghost.name;
        if (this.counts.has(key)) {
            const count = this.counts.get(key);
            this.counts.set(key, count + 1);
        } else {
            this.counts.set(key, 1);
        }
    }

    public getCountFor(name: string): number {
        return this.counts.get(name) || 0;
    }
}