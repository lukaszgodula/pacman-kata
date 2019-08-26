import { Direction } from '../../src/pacman-core/Direction.enum';

export function getDirections(): Direction[] {
	return Object.keys(Direction).map(key => Direction[key] as Direction);
}