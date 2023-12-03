import { loadTextfile, prepareLines } from "@utils/files";

const data = await loadTextfile("input.txt");
const lines = prepareLines(data);

let validNumbers: number[] = [];

// TODO: approach that first find all symbols and then check if there is a number next to it
//
let partNumberSum = 0;

// my solution: wrong by 49 (probably because of some edge cases)
function solve(input: string[]) {
    for (let i = 0; i < input.length; i++) {
        const match = input[i].match(/\d+/g);

        const currentLine = input[i];
        const nextLine = input[i + 1] || "";
        const previousLine = input[i - 1] || "";

        // part until line 42 comes from internet: https://github.com/lucasteng123/advent-of-code-2023/blob/main/src/days/day3.ts
        // TODO: find out why this works and my solution from line 45 doesnt
        const matches = [...currentLine.matchAll(/(\d+)/g)];

        for (const match of matches) {
            const textBlock = [
                previousLine.substring(
                    match.index! - 1,
                    match.index! + match[0].length + 1
                ),
                lines[i].substring(
                    match.index! - 1,
                    match.index! + match[0].length + 1
                ),
                nextLine.substring(
                    match.index! - 1,
                    match.index! + match[0].length + 1
                ),
            ];

            const findSymbol = textBlock.join("").match(/[^\d.]/);
            if (findSymbol) partNumberSum += Number(match[0]);
        }

        if (match) {
            match.forEach((number) => {
                const numberStartIndex = input[i].indexOf(number);
                const numberEndIndex = numberStartIndex + number.length - 1;

                // check if number has a symbol on the left or right
                const leftSymbol = input[i]?.charAt(numberStartIndex - 1);
                const rightSymbol = input[i]?.charAt(numberEndIndex + 1);

                // regex to find symbols except a-z, A-Z, 0-9 and .
                const regex = /[^.\d]/g;

                // check if number has a symbol on the left or right
                if (leftSymbol?.match(regex) || rightSymbol?.match(regex)) {
                    validNumbers.push(parseInt(number));
                    // if one check is true we can skip to the next number in the line
                    console.log("is valid");
                    return;
                }

                // check if number has a symbol top or bottom or diagonally (pre or next line in array)
                for (let j = -1; j < number.length + 1; j++) {
                    const topSymbol = input[i - 1]?.charAt(
                        numberStartIndex + j
                    );
                    const bottomSymbol = input[i + 1]?.charAt(
                        numberStartIndex + j
                    );

                    // check if number has a symbol on the top or bottom (pre or next line in array)
                    if (topSymbol?.match(regex) || bottomSymbol?.match(regex)) {
                        validNumbers.push(parseInt(number));
                        // if one check is true we can skip to the next number in the line
                        console.log("is valid");
                        return;
                    }
                }
            });
        }
    }
}

solve(lines);

console.log("Part 1 internet", partNumberSum);

console.log(
    "Part 1 my solution",
    validNumbers.reduce((a, b) => a + b, 0)
);
