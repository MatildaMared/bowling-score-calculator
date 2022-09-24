import { Frame, FrameStatus, Throw } from "../types";

export class BowlingScoreCalculator {
	name: string;
	bowlingThrows: Frame[] = [];
	currentFrame: number = 1;
	totalScore: number = 0;
	gameCompleted: boolean = false;

	constructor(name: string) {
		this.name = name;
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

	getThrowForOneFrameBack() {
		if (this.currentFrame - 1 <= 0) {
			return this.bowlingThrows[this.bowlingThrows.length - 1];
		}

		return null;
	}

	getThrowForTwoFramesBack() {
		if (this.currentFrame - 2 >= 0) {
			return this.bowlingThrows[this.bowlingThrows.length - 2];
		}

		return null;
	}

	addPointsIncludingPreviousFrames(pointsForCurrentFrame: number) {
		this.totalScore += pointsForCurrentFrame;

		const throwForOneFrameBack = this.getThrowForOneFrameBack();
		const throwForTwoFramesBack = this.getThrowForTwoFramesBack();

		if (
			throwForOneFrameBack &&
			throwForOneFrameBack.status === FrameStatus.Strike
		) {
			console.log("🎳 Adding points for previous strike!");
			this.totalScore += pointsForCurrentFrame;
		}

		if (
			throwForTwoFramesBack &&
			throwForTwoFramesBack.status === FrameStatus.Strike
		) {
			console.log("🎳 Adding points for previous strike or spare!");
			this.totalScore += pointsForCurrentFrame;
		}
	}

	handleStrike() {
		console.log(
			"will handle points for strike for frame number: ",
			this.currentFrame
		);

		if (this.currentFrame === 10) {
			console.log("On the last frame!");
			if (this.bowlingThrows.length === 11) {
				this.gameCompleted = true;
			}
		} else {
			this.currentFrame++;
		}

		this.bowlingThrows.push({
			throws: [10, null],
			status: FrameStatus.Strike,
		});

		this.addPointsIncludingPreviousFrames(10);
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

	// 	addThrow(throw: number) {
	// 		if (throw === 10) {
	// 			// Om strike
	// 			this.bowlingScore[this.currentFrame - 1].throws = [10, null];
	// 			this.bowlingScore[this.currentFrame - 1].status = FrameStatus.Strike;
	// 			this.totalPoints += 10;
	// 			this.currentFrame += 1;
	// 		}
	// 	return "Good job";
	// }
}
