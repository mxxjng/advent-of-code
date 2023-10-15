import { loadTextfile } from "@utils/files";

const data = await loadTextfile("./input/input.txt");
const input = data.split("\n");

const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];

const score = input.reduce((acc, val) => {
    // split string in middle
    let first = val.substring(0, val.length / 2);
    let second = val.substring(val.length / 2);

    // find matching chars for both strings
    let chrs = first.split("");
    let matchChar = "";

    chrs.forEach((e) => {
        if (second.indexOf(e) !== -1) {
            matchChar = e;
        }
    });

    return (acc += getPriority(matchChar));
}, 0);

function getPriority(char: string) {
    let index = alphabet.findIndex((i) => i === char.toLowerCase());

    if (char === char.toUpperCase()) {
        return index + 27;
    } else {
        return index + 1;
    }
}

console.log(score);
