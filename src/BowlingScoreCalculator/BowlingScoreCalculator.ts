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
		if (this.gameCompleted) {
			throw new Error(
				"This game is completed, please start a new game if you want to continue playing!"
			);
		}

		if (newThrow === Throw.Strike) {
			this.handleStrike();
		} else if (newThrow === Throw.Spare) {
			console.log("You got a spare! 🌈");
		}
	}

	private addScoreForLastFrame(pointsForCurrentThrow: number) {
		let score = pointsForCurrentThrow;

		if (
			this.bowlingThrows[8].status === FrameStatus.Strike &&
			this.bowlingThrows[10].throws.length === 1
		) {
			this.bowlingThrows[8].points += pointsForCurrentThrow;
			score += pointsForCurrentThrow;
		}
		if (
			this.bowlingThrows[9].status === FrameStatus.Strike &&
			(this.bowlingThrows[10].throws.length === 1 ||
				this.bowlingThrows[10].throws.length === 2)
		) {
			this.bowlingThrows[9].points += pointsForCurrentThrow;
			score += pointsForCurrentThrow;
		}

		this.totalScore += score;
		this.bowlingThrows[10].points += pointsForCurrentThrow;
		return;
	}

	private addScore(pointsForCurrentThrow: number) {
		let score = pointsForCurrentThrow;

		const throwForOneFrameBack = this.bowlingThrows[this.currentFrame - 1];
		const throwForTwoFramesBack = this.bowlingThrows[this.currentFrame - 2];

		if (
			throwForOneFrameBack &&
			throwForOneFrameBack.status === FrameStatus.Strike
		) {
			score += pointsForCurrentThrow;
			throwForOneFrameBack.points += pointsForCurrentThrow;
		}

		if (
			throwForTwoFramesBack &&
			throwForTwoFramesBack.status === FrameStatus.Strike
		) {
			score += pointsForCurrentThrow;
			throwForTwoFramesBack.points += pointsForCurrentThrow;
		}

		this.bowlingThrows[this.currentFrame].points += pointsForCurrentThrow;
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
				this.announce();
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
