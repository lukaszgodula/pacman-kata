import { Point } from "./Point";

export function doCollide(a: Point, b: Point): boolean {
	return a.x === b.x && a.y === b.y;
}