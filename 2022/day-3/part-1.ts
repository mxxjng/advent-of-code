import * as fs from "fs";

const input = fs.readFileSync("./input/input.txt").toString().split("\n");

const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];

function solve(input: string[]) {
    let arr: string[][] = [];
    let score = 0;

    for (const i in input) {
        // split string in middle
        let first = input[i].substring(0, input[i].length / 2);
        let second = input[i].substring(input[i].length / 2);

        let matchingChars: string[] = [];

        // find matching chars for both strings
        for (let i = 0; i < first.length; i++) {
            for (let p = 0; p < second.length; p++) {
                if (first[i] === second[p]) {
                    matchingChars.push(first[i]);
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
