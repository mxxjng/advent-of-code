import { loadTextfile, prepareLines } from "@utils/files";

const data = await loadTextfile("input.txt");
const lines = prepareLines(data);

//const testNumbers = ["3   4", "4   3", "2   5", "1   3", "3   9", "3   3"];

/**
 * Generates two arrays from string array
 * @param lines - lines to generate arrays from
 * @returns tuple of number arrays
 */
function generateNumberArrays(lines: string[]) {
    let firstArr = [];
    let secondArr = [];

    for (const line of lines) {
        const [first, second] = line.split("   ");

        firstArr.push(parseInt(first));
        secondArr.push(parseInt(second));
    }

    return [firstArr, secondArr];
}

function partOne(lines: string[]) {
    let [firstArr, secondArr] = generateNumberArrays(lines);

    firstArr.sort((a, b) => a - b);
    secondArr.sort((a, b) => a - b);

    let diff = 0;

    for (let i = 0; i < firstArr.length; i++) {
        diff += Math.abs(firstArr[i] - secondArr[i]);
    }

    return diff;
}

function partTwo(lines: string[]) {
    let [firstArr, secondArr] = generateNumberArrays(lines);

    let similarityScore = 0;

    for (let i = 0; i < firstArr.length; i++) {
        let currentNumber = firstArr[i];
        let occurences = secondArr.filter((n) => n === currentNumber).length;

        similarityScore += currentNumber * occurences;
    }

    return similarityScore;
}

console.log(partOne(lines));
console.log(partTwo(lines));
