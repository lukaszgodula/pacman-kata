import { PacManDirection } from '../../src/pacman-core/PacManDirection.enum';

export function getDirections(): PacManDirection[] {
	return Object.keys(PacManDirection).map(key => PacManDirection[key] as PacManDirection);
}