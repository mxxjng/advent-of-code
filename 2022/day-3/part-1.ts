import * as fs from "fs";

const input = fs.readFileSync("./input/input.txt").toString().split("\n");

const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];

function solve(input: string[]) {
    let score = 0;

    input.forEach((i) => {
        // split string in middle
        let first = i.substring(0, i.length / 2);
        let second = i.substring(i.length / 2);

        // find matching chars for both strings
        let chrs = first.split("");
        let matchChar = "";

        chrs.forEach((e) => {
            if (second.indexOf(e) !== -1) {
                matchChar = e;
            }
        });

        score += getPriority(matchChar);
    });

    console.log(score);
}

function getPriority(char: string) {
    let index = alphabet.findIndex((i) => i === char.toLowerCase());

    if (char === char.toUpperCase()) {
        return index + 27;
    } else {
        return index + 1;
    }
}

solve(input);
