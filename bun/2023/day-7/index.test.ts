import { expect, test } from "bun:test";
import { partOne } from "./part-1";
import { partTwo } from "./part-2";

const exampleData = [
    "32T3K 765",
    "T55J5 684",
    "KK677 28",
    "KTJJT 220",
    "QQQJA 483",
];

test("part one example should be correct", () => {
    expect(partOne(exampleData)).toEqual(6440);
});

test("part two example should be correct", () => {
    expect(partTwo(exampleData)).toEqual(5905);
});
