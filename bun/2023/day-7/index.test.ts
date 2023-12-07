import { expect, test } from "bun:test";
import { partOne } from ".";

test("part one example should be correct", () => {
    const exampleData = [
        "32T3K 765",
        "T55J5 684",
        "KK677 28",
        "KTJJT 220",
        "QQQJA 483",
    ];

    expect(partOne(exampleData)).toEqual(6440);
});
