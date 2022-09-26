export enum FrameStatus {
	Strike = "strike",
	Spare = "spare",
	Completed = "completed",
	NotCompleted = "not completed",
}

export enum Throw {
	Strike = "X",
	Spare = "/",
	Miss = "-",
}

export class Frame {
	throws: number[];
	points: number;
	status: FrameStatus;

	constructor() {
		this.throws = [];
		this.points = 0;
		this.status = FrameStatus.NotCompleted;
	}
}

export interface BowlingThrows {
	[key: number]: Frame;
}
