import { BowlingScoreCalculator } from "./BowlingScoreCalculator";

describe("Bowling Score Calculator", () => {
	it("calculates total to 300 points given the throws X X X X X X X X X X X X", () => {
		const throws = "X X X X X X X X X X X X";
		const throwsIterable = throws.split(" ");
		const bowlingScoreCalculator = new BowlingScoreCalculator("Test");

		for (const bowlingThrow of throwsIterable) {
			bowlingScoreCalculator.addThrow(bowlingThrow);
		}

		const expected = 300;
		const result = bowlingScoreCalculator.totalScore;

		expect(result).toBe(expected);
	});
});
