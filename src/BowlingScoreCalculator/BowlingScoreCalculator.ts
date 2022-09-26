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
			console.log(this.bowlingThrows);
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
					this.advanceFrame();
					this.currentFrame === 10 &&
						currentFrame.status === FrameStatus.Completed;
					this.gameCompleted = true;
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
		this.addScore(scoreForCurrentThrow);
		this.advanceFrame();
	}

	private handleMiss() {
		console.log("Oh no you missed...");
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

		const currentFrame = this.bowlingThrows[this.currentFrame];
		const throwForOneFrameBack = this.bowlingThrows[this.currentFrame - 1];
		const throwForTwoFramesBack = this.bowlingThrows[this.currentFrame - 2];

		if (throwForOneFrameBack) {
			switch (throwForOneFrameBack.status) {
				case FrameStatus.Strike:
					score += pointsForCurrentThrow;
					throwForOneFrameBack.points += pointsForCurrentThrow;
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
