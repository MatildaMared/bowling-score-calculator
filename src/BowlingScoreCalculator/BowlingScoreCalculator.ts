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
				currentFrame.throws.push(+newThrow);
				this.addScore(+newThrow);
				if (currentFrame.throws.length === 2) {
					if (this.currentFrame === 10) {
						currentFrame.status = FrameStatus.Completed;
						this.gameCompleted = true;
					} else {
						currentFrame.status = FrameStatus.Completed;
						this.advanceFrame();
					}
				}

				break;
		}
	}

	private handleSpare() {
		const currentFrame = this.bowlingThrows[this.currentFrame];
		const scoreForCurrentThrow =
			10 - this.bowlingThrows[this.currentFrame].throws[0];

		currentFrame.throws.push(scoreForCurrentThrow);
		currentFrame.status = FrameStatus.Spare;

		if (this.currentFrame === 10) {
			this.addScoreForLastFrame(scoreForCurrentThrow);
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
		currentFrame.throws.push(0);
		if (currentFrame.throws.length === 2) {
			currentFrame.status = FrameStatus.Completed;
			if (this.currentFrame === 10) {
				this.gameCompleted = true;
			} else {
				this.advanceFrame();
			}
		}
	}

	private addScoreForLastFrame(pointsForCurrentThrow: number) {
		let score = pointsForCurrentThrow;
		const currentFrame = this.bowlingThrows[this.currentFrame];
		const throwForOneFrameBack = this.bowlingThrows[this.currentFrame - 1];
		const throwForTwoFramesBack = this.bowlingThrows[this.currentFrame - 2];

		if (
			throwForTwoFramesBack.status === FrameStatus.Strike &&
			currentFrame.throws.length === 1
		) {
			throwForTwoFramesBack.points += pointsForCurrentThrow;
			score += pointsForCurrentThrow;
		}

		if (
			throwForOneFrameBack.status === FrameStatus.Strike &&
			(currentFrame.throws.length === 1 || currentFrame.throws.length === 2)
		) {
			throwForOneFrameBack.points += pointsForCurrentThrow;
			score += pointsForCurrentThrow;
		}

		if (
			throwForOneFrameBack.status === FrameStatus.Spare &&
			currentFrame.throws.length === 1
		) {
			throwForOneFrameBack.points += pointsForCurrentThrow;
			score += pointsForCurrentThrow;
		}

		this.totalScore += score;
		currentFrame.points += pointsForCurrentThrow;
	}

	private addScore(pointsForCurrentThrow: number) {
		let score = pointsForCurrentThrow;

		const currentFrame = this.bowlingThrows[this.currentFrame];
		const throwForOneFrameBack = this.bowlingThrows[this.currentFrame - 1];
		const throwForTwoFramesBack = this.bowlingThrows[this.currentFrame - 2];

		if (throwForOneFrameBack) {
			switch (throwForOneFrameBack.status) {
				case FrameStatus.Strike:
					throwForOneFrameBack.points += pointsForCurrentThrow;
					score += pointsForCurrentThrow;
					break;
				case FrameStatus.Spare:
					if (currentFrame.throws.length === 1) {
						throwForOneFrameBack.points += pointsForCurrentThrow;
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
				score += pointsForCurrentThrow;
				throwForTwoFramesBack.points += pointsForCurrentThrow;
			}
		}

		currentFrame.points += pointsForCurrentThrow;
		this.totalScore += score;
	}

	private handleStrike() {
		let currentFrame = this.bowlingThrows[this.currentFrame];

		if (this.currentFrame === 10) {
			currentFrame.throws.push(10);
			currentFrame.status = FrameStatus.Strike;
			this.addScoreForLastFrame(10);
			if (currentFrame.throws.length === 3) {
				this.gameCompleted = true;
			}
		} else {
			this.bowlingThrows[this.currentFrame].throws.push(10);
			this.bowlingThrows[this.currentFrame].status = FrameStatus.Strike;
			this.addScore(10);
			this.advanceFrame();
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
