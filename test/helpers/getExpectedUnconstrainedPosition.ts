import { Direction } from "../../src/pacman-core/Direction.enum";
import { Point } from "../../src/pacman-core/Point";

export function getExpectedUnconstrainedPosition(direction: Direction, currentPosition: Point): Point {
	switch (direction) {
		case Direction.Down:
			return { ...currentPosition, y: currentPosition.y - 1 };
		case Direction.Left:
			return { ...currentPosition, x: currentPosition.x - 1 };
		case Direction.Right:
			return { ...currentPosition, x: currentPosition.x + 1 };
		case Direction.Up:
			return { ...currentPosition, y: currentPosition.y + 1 };
	}
}