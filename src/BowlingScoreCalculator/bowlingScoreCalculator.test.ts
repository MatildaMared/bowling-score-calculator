import { BowlingScoreCalculator } from "./BowlingScoreCalculator";

describe("Bowling Score Calculator", () => {
	it("calculates score to 300 points given the throws 'X X X X X X X X X X X X'", () => {
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

	it("caculates score to 150 points given the throws '5 / 5 / 5 / 5 / 5 / 5 / 5 / 5 / 5 / 5 / 5'", () => {
		const throws = "5 / 5 / 5 / 5 / 5 / 5 / 5 / 5 / 5 / 5 / 5";
		const throwsIterable = throws.split(" ");
		const bowlingScoreCalculator = new BowlingScoreCalculator("Test");

		for (const bowlingThrow of throwsIterable) {
			bowlingScoreCalculator.addThrow(bowlingThrow);
		}

		const expected = 150;
		const result = bowlingScoreCalculator.totalScore;

		expect(result).toBe(expected);
	});

	it("calculates score to 90 points given the throws '9 - 9 - 9 - 9 - 9 - 9 - 9 - 9 - 9 - 9 -'", () => {
		const throws = "9 - 9 - 9 - 9 - 9 - 9 - 9 - 9 - 9 - 9 -";
		const throwsIterable = throws.split(" ");
		const bowlingScoreCalculator = new BowlingScoreCalculator("Test");

		for (const bowlingThrow of throwsIterable) {
			bowlingScoreCalculator.addThrow(bowlingThrow);
		}

		const expected = 90;
		const result = bowlingScoreCalculator.totalScore;

		expect(result).toBe(expected);
	});

	it("calculates score to 101 points given the throws '9 - 9 - 9 - 9 - 9 - 9 - 9 - 9 - 9 - 9 / X'", () => {
		const throws = "9 - 9 - 9 - 9 - 9 - 9 - 9 - 9 - 9 - 9 / X";
		const throwsIterable = throws.split(" ");
		const bowlingScoreCalculator = new BowlingScoreCalculator("Test");

		for (const bowlingThrow of throwsIterable) {
			bowlingScoreCalculator.addThrow(bowlingThrow);
		}

		const expected = 101;
		const result = bowlingScoreCalculator.totalScore;

		expect(result).toBe(expected);
	});

	it("calculates the score to 92 points given the throws '5 4 5 / 7 / 6 - 5 - 9 - X 5 - - 3 - 7'", () => {
		const throws = "5 4 5 / 7 / 6 - 5 - 9 - X 5 - - 3 - 7";

		const throwsIterable = throws.split(" ");
		const bowlingScoreCalculator = new BowlingScoreCalculator("Test");

		for (const bowlingThrow of throwsIterable) {
			bowlingScoreCalculator.addThrow(bowlingThrow);
		}

		const expected = 92;
		const result = bowlingScoreCalculator.totalScore;

		expect(result).toBe(expected);
	});

	it("calculates the score to 112 points given the throws 'X 5 / 6 - 5 4 7 - X 3 2 5 / 7 / - 7'", () => {
		const throws = "X 5 / 6 - 5 4 7 - X 3 2 5 / 7 / - 7";

		const throwsIterable = throws.split(" ");
		const bowlingScoreCalculator = new BowlingScoreCalculator("Test");

		for (const bowlingThrow of throwsIterable) {
			bowlingScoreCalculator.addThrow(bowlingThrow);
		}

		const expected = 112;
		const result = bowlingScoreCalculator.totalScore;

		expect(result).toBe(expected);
	});
});
