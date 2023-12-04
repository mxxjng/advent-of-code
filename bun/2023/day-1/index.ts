import { loadTextfile, prepareLines } from "@utils/files";

const data = await loadTextfile("input.txt");
const lines = prepareLines(data);

// needs to have the number as word at the end so it doenst replace the overlapping number words like: xfoneight8sevenone3
const addNumber: Record<string, any> = {
    one: "one1one",
    two: "two2two",
    three: "three3three",
    four: "four4four",
    five: "five5five",
    six: "six6six",
    seven: "seven7seven",
    eight: "eight8eight",
    nine: "nine9nine",
};

function calculateSum(lines: string[]) {
    return lines.reduce((acc, val) => {
        const match = val.match(/\d/g);

        if (match)
            // get first and last number from the match and add them to the accumulator
            return acc + parseInt(`${match[0]}${match[match.length - 1]}`);

        return 0;
    }, 0);
}

// modify the lines to replace the word numbers with the number itself
function modifyLines(lines: string[]) {
    return lines.map((line) => {
        for (const key in addNumber) {
            line = line.replaceAll(key, addNumber[key]);
        }
        return line;
    });
}

console.log("Part 1:", calculateSum(lines));
console.log("Part 2:", calculateSum(modifyLines(lines)));
