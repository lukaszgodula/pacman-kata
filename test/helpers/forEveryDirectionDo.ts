import { getDirections } from "./getDirections";
import { Direction } from "../../src/pacman-core/Direction.enum";

export function forEveryDirectionDo(action: (direction: Direction) => void): void {
	const directions = getDirections();

	for (const direction of directions) {
		console.log('testing direction: ' + direction);
		action(direction);
	}
}