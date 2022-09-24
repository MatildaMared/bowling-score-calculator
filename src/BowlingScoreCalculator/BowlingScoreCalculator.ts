import { Frame, Throw } from "../types";

export class BowlingScoreCalculator {
	name: string;
	bowlingScore: Frame[] = [];
	currentFrame: number = 1;
	totalPoints: number = 10;
	test: string = "";

	constructor(name: string) {
		this.name = name;
	}

	sayHi() {
		console.log("hi");
	}

	addThrow(newThrow: string | Throw) {
		console.log("🎳 Adding throw: ", newThrow);
		if (newThrow === Throw.Strike) {
			console.log("You got a strike! ✨");
		} else if (newThrow === Throw.Spare) {
			console.log("You got a spare! 🌈");
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
