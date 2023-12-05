import { loadTextfile, prepareLines } from "@utils/files";

const data = await loadTextfile("input.txt");
const lines = prepareLines(data);

let validNumbers: number[] = [];
let partNumberSum = 0;

// modified internet solution to understand better: original https://github.com/lucasteng123/advent-of-code-2023/blob/main/src/days/day3.ts
function solve(input: string[]) {
    for (let i = 0; i < input.length; i++) {
        const currentLine = input[i];
        const nextLine = input[i + 1] || "";
        const previousLine = input[i - 1] || "";

        const matches = [...currentLine.matchAll(/(\d+)/g)];

        for (const match of matches) {
            // get the index of the match where the number starts and ends
            const partStartIndex = match.index!;
            const partEndIndex = partStartIndex + match[0].length + 1;

            // get the current line from the number with one signe before and after
            // and the previous and next line from the number with one signe before and after
            // this is needed to check if the number is surrounded by a symbol
            const textBlock = [
                previousLine.substring(partStartIndex - 1, partEndIndex),
                currentLine.substring(partStartIndex - 1, partEndIndex),
                nextLine.substring(partStartIndex - 1, partEndIndex),
            ];

            // join the textBlock to a string and check if there is a symbol in it
            const findSymbol = textBlock.join("").match(/[^\d.]/);

            // if there is a symbol in the textBlock we can add the number to the sum
            if (findSymbol) partNumberSum += parseInt(match[0]);
        }
    }
}

solve(lines);
console.log("Part 1", partNumberSum);

// my first solution: wrong by 49 (probably because of some edge cases)
function solveOld(input: string[]) {
    for (let i = 0; i < input.length; i++) {
        const match = input[i].match(/\d+/g);

        if (match) {
            match.forEach((number) => {
                // NOTE: error probably occurs here when 2 same numbers are in the line?
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
                        return;
                    }
                }
            });
        }
    }
}

solveOld(lines);

console.log(
    "Part 1 my solution",
    validNumbers.reduce((a, b) => a + b, 0)
);
