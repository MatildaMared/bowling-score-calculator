import { Frame, FrameStatus, Throw, BowlingThrows } from "../types";

export class BowlingScoreCalculator {
	name: string;
	bowlingThrows: BowlingThrows = {};
	currentFrame: number = 1;
	totalScore: number = 0;
	gameCompleted: boolean = false;

	constructor(name: string) {
		this.name = name;
		this.bowlingThrows[this.currentFrame] = new Frame();
	}

	addThrow(newThrow: string | Throw) {
		const currentFrame = this.bowlingThrows[this.currentFrame];

		if (this.gameCompleted) {
			throw new Error(
				"This game is completed, please start a new game if you want to continue playing!"
			);
		}

		switch (newThrow) {
			case Throw.Strike:
				this.handleStrike();
				break;
			case Throw.Spare:
				this.handleSpare();
				break;
			case Throw.Miss:
				this.handleMiss();
				break;
			default:
				if (currentFrame.throws.length === 1) {
					this.addStatsToFrame(+newThrow, FrameStatus.Completed);
					this.addScore(+newThrow);
					if (this.currentFrame === 10) {
						this.gameCompleted = true;
					} else {
						this.advanceFrame();
					}
				} else {
					this.addStatsToFrame(+newThrow);
					this.addScore(+newThrow);
				}

				break;
		}
	}

	private handleSpare() {
		const currentFrame = this.bowlingThrows[this.currentFrame];
		const scoreForCurrentThrow = 10 - currentFrame.throws[0];

		this.addStatsToFrame(scoreForCurrentThrow, FrameStatus.Spare);

		if (this.currentFrame === 10) {
			// this.addScoreForLastFrame(scoreForCurrentThrow);
			this.addScore(scoreForCurrentThrow);
			if (currentFrame.throws.length === 3) {
				this.gameCompleted = true;
			}
		} else {
			this.addScore(scoreForCurrentThrow);
			this.advanceFrame();
		}
	}

	private handleMiss() {
		const currentFrame = this.bowlingThrows[this.currentFrame];
		if (currentFrame.throws.length === 1) {
			this.addStatsToFrame(0, FrameStatus.Completed);
			if (this.currentFrame === 10) {
				this.gameCompleted = true;
			} else {
				this.advanceFrame();
			}
		} else {
			this.addStatsToFrame(0);
		}
	}

	private addScore(pointsForCurrentThrow: number) {
		let score = pointsForCurrentThrow;
		const currentFrame = this.bowlingThrows[this.currentFrame];
		const throwForOneFrameBack = this.bowlingThrows[this.currentFrame - 1];
		const throwForTwoFramesBack = this.bowlingThrows[this.currentFrame - 2];

		if (throwForOneFrameBack) {
			switch (throwForOneFrameBack.status) {
				case FrameStatus.Strike:
					if (currentFrame.throws.length === 3) return;
					throwForOneFrameBack.score += pointsForCurrentThrow;
					score += pointsForCurrentThrow;
					break;
				case FrameStatus.Spare:
					if (currentFrame.throws.length === 1) {
						throwForOneFrameBack.score += pointsForCurrentThrow;
						score += pointsForCurrentThrow;
					}
					break;
				default:
					break;
			}
		}

		if (
			throwForTwoFramesBack &&
			throwForTwoFramesBack.status === FrameStatus.Strike
		) {
			if (currentFrame.status === FrameStatus.Strike) {
				if (currentFrame.throws.length === 3) return;
				score += pointsForCurrentThrow;
				throwForTwoFramesBack.score += pointsForCurrentThrow;
			}
		}

		currentFrame.score += pointsForCurrentThrow;
		this.totalScore += score;
	}

	private handleStrike() {
		if (this.currentFrame === 10) {
			this.addStatsToFrame(10, FrameStatus.Strike);
			// this.addScoreForLastFrame(10);
			this.addScore(10);
			if (this.bowlingThrows[this.currentFrame].throws.length === 3) {
				this.gameCompleted = true;
			}
		} else {
			this.addStatsToFrame(10, FrameStatus.Strike);
			this.addScore(10);
			this.advanceFrame();
		}
	}

	addStatsToFrame(points: number, status?: FrameStatus) {
		const currentFrame = this.bowlingThrows[this.currentFrame];
		currentFrame.throws.push(points);
		if (status) {
			currentFrame.status = status;
		}
	}

	private advanceFrame() {
		this.bowlingThrows[this.currentFrame + 1] = new Frame();
		this.currentFrame++;
	}

	announce() {
		if (this.currentFrame === 10 && this.gameCompleted) {
			console.log(
				`🎳 ${this.name} has completed the game with a total score of ${this.totalScore} points! Good job! 🎉`
			);
		} else {
			console.log(
				`🎳 ${this.name} is currently on frame ${this.currentFrame} and has a current score of ${this.totalScore} points! Keep going! 🥳`
			);
		}
	}
}
