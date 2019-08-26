import { PacManDirection } from "../../src/pacman-core/PacManDirection.enum";
import { Point } from "../../src/pacman-core/Point";

export function getExpectedUnconstrainedPosition(direction: PacManDirection, currentPosition: Point): Point {
	switch (direction) {
		case PacManDirection.Down:
			return { ...currentPosition, y: currentPosition.y - 1 };
		case PacManDirection.Left:
			return { ...currentPosition, x: currentPosition.x - 1 };
		case PacManDirection.Right:
			return { ...currentPosition, x: currentPosition.x + 1 };
		case PacManDirection.Up:
			return { ...currentPosition, y: currentPosition.y + 1 };
	}
}