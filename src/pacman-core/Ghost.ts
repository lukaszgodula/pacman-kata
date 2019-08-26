import { Grid } from "./Grid";
import { GhostModel } from "./Ghost.model";
import { Direction } from "./Direction.enum";
import { Point } from "./Point";
import { doCollide } from "./doCollide";

export class Ghost {
	public get name(): string { return this.model.name };
	public set name(v: string) { this.model.name = v };

	public get direction(): Direction { return this.model.direction };
	public set direction(v: Direction) { this.model.direction = v };

	private model: GhostModel = {
		name: null,
		direction: null
	};

	constructor(
		initialSetup: Partial<GhostModel>,
		public grid?: Grid
	) {
		this.model = { ...this.model, ...initialSetup };
	}

	public tick() {
		const myPosition = this.grid.getGhostPosition(this);
		switch (this.direction) {
			case Direction.Down:
				this.tryMoveTo({ y: myPosition.y - 1 });
				break;
			case Direction.Left:
				this.tryMoveTo({ x: myPosition.x - 1 });
				break;
			case Direction.Right:
				this.tryMoveTo({ x: myPosition.x + 1 });
				break;
			case Direction.Up:
				this.tryMoveTo({ y: myPosition.y + 1 });
				break;
		}
	}

	private tryMoveTo(changedCoordinates: Partial<Point>): void {
		const myPosition = this.grid.getGhostPosition(this);
		const destination = { ...myPosition, ...changedCoordinates };
		if (this.canMoveTo(destination)) {
			this.grid.setGhostPosition(this, destination);
		}
	}

	private canMoveTo(point: Point): boolean {
		return this.grid.obstaclesPositions.find(obstacle => doCollide(obstacle, point)) === undefined
			&& !doCollide(this.grid.pacmanPosition, point);
	}
}