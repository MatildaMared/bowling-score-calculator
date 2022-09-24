export enum FrameStatus {
	Strike = "strike",
	Spare = "spare",
	Points = "points",
}

export enum Throw {
	Strike = "X",
	Spare = "/",
	Miss = "-",
}

export interface Frame {
	throws: [number, number | null, number?];
	status: FrameStatus;
}
