import * as fs from "fs";

const input = fs.readFileSync("./input/input.txt").toString();

function solve(input: string, distinctCharLength: number) {
    for (let i = 0; i < input.length; i++) {
        let chars = input.substring(i, i + distinctCharLength);

        if (stringIsUnique(chars)) {
            console.log(i + distinctCharLength);
            break;
        }
    }
}

function stringIsUnique(input: string) {
    for (let i = 0; i < input.length; i++) {
        if (input.indexOf(input[i]) !== input.lastIndexOf(input[i])) {
            return false;
        }
    }
    return true;
}

solve(input, 4);
solve(input, 14);
