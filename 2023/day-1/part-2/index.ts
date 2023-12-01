import { loadTextfile } from "@utils/files";

const data = await loadTextfile("input.txt");
const lines = data.split("\n");

const digits: Record<string, any> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
};

function solve(lines: string[]) {
    return lines.reduce((acc, val) => {
        // get all numbers from the line
        const regex = /\d|one|two|three|four|five|six|seven|eight|nine/g;

        const match = val.match(regex);

        if (match) {
            const firstNumber = digits[match[0]];
            const lastNumber = digits[match[match.length - 1]];

            const combined = parseInt(`${firstNumber}${lastNumber}`);

            return acc + combined;
        }

        return 0;
    }, 0);
}

// remove last line from array because its somehow empty
console.log(solve(lines.slice(0, lines.length - 1)));
