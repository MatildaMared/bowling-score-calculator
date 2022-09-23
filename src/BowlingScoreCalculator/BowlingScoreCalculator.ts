enum FrameStatus {
	Strike = "strike",
	Spare = "spare",
	Nothing = "nothing",
}

interface Frame {
	throws: [number, number | null];
	status: FrameStatus;
}

export class BowlingScoreCalculator {
	name: string;
	bowlingScore: Frame[] = [];
	currentFrame: number = 1;
	totalPoints: number = 10;

	constructor(name: string) {
		this.name = name;
	}

	addThrow(numberOfPinsDown: number) {
		if (numberOfPinsDown === 10) {
			// Om strike
			this.bowlingScore[this.currentFrame - 1].throws = [10, null];
			this.bowlingScore[this.currentFrame - 1].status = FrameStatus.Strike;
			this.totalPoints += 10;
			this.currentFrame += 1;
		}
	}
}
