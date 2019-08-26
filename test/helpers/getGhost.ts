import { Ghost } from "../../src/pacman-core/Ghost";
import { GhostModel } from "../../src/pacman-core/Ghost.model";

export function getGhost(withSetup: Partial<GhostModel>): Ghost {
	return new Ghost({ ...withSetup });
}