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
	score: number;
	status: FrameStatus;

	constructor() {
		this.throws = [];
		this.score = 0;
		this.status = FrameStatus.NotCompleted;
	}
}

export interface BowlingThrows {
	[key: number]: Frame;
}
