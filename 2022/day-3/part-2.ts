import * as fs from "fs";

const input = fs.readFileSync("./input/input.txt").toString().split("\n");

const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];

function solve(input: string[]) {
    let arr: string[][] = [];
    let score = 0;

    for (let i = 0; i < input.length; i += 3) {
        const first = input[i];
        const second = input[i + 1];
        const third = input[i + 2];

        let matchingChars: string[] = [];

        // find matching chars for all three strings
        for (let k = 0; k < first.length; k++) {
            for (let p = 0; p < second.length; p++) {
                for (let j = 0; j < third.length; j++) {
                    if (first[k] === second[p] && second[p] === third[j]) {
                        matchingChars.push(first[k]);
                    }
                }
            }
        }

        arr.push(matchingChars);
    }

    for (const c in arr) {
        // get the one common char in string
        let char = arr[c][0];

        // find the priority for the char
        let index = alphabet.findIndex((i) => i === char.toLowerCase());

        if (char === char.toUpperCase()) {
            score += index + 27;
        } else {
            score += index + 1;
        }
    }

    console.log(score);
}

solve(input);
