import { expect, test } from "bun:test";
import { parseLine } from ".";

test("string should be formatted correctly", () => {
    const tests = [
        {
            input: "Test:        1     2     3     4",
            expected: [1, 2, 3, 4],
        },
        {
            input: "Test:        4     3     2     1",
            expected: [4, 3, 2, 1],
        },
    ];

    tests.forEach(({ input, expected }) => {
        expect(parseLine(input)).toEqual(expected);
    });
});
