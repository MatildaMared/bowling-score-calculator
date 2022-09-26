import { BowlingScoreCalculator } from "./BowlingScoreCalculator";

describe("Bowling Score Calculator", () => {
	it("calculates score to 300 points given the throws X X X X X X X X X X X X", () => {
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

	it("caculates score to 150 points given the throws 5 / 5 / 5 / 5 / 5 / 5 / 5 / 5 / 5 / 5 / 5", () => {
		const throws = "5 / 5 / 5 / 5 / 5 / 5 / 5 / 5 / 5 / 5 / 5";
		const throwsIterable = throws.split(" ");
		const bowlingScoreCalculator = new BowlingScoreCalculator("Test");

		for (const bowlingThrow of throwsIterable) {
			bowlingScoreCalculator.addThrow(bowlingThrow);
		}

		const expected = 150;
		const result = bowlingScoreCalculator.totalScore;
		bowlingScoreCalculator.announce();
		console.log(bowlingScoreCalculator.bowlingThrows);

		expect(result).toBe(expected);
	});
});
