import * as fs from "fs";

const input = fs.readFileSync("./input/input.txt").toString().split("\n");
const moveInput = fs
    .readFileSync("./input/moveinput.txt")
    .toString()
    .split("\n");

let stacks = createStackArrays(input);

function solve(input: string[]) {
    for (const i in input) {
        let commands = input[i].replace("\r", "").split(" ");
        let movementAmount = parseInt(commands[1]);
        let origin = parseInt(commands[3]) - 1;
        let destination = parseInt(commands[5]) - 1;

        let removed = stacks[origin].splice(
            stacks[origin].length - movementAmount,
            movementAmount
        );

        stacks[destination] = stacks[destination].concat(removed);
    }

    let word: string[] = [];

    // read final objects on each stack
    for (const s in stacks) {
        word.push(stacks[s][stacks[s].length - 1]);
    }

    console.log(word.join(""));
}

function createStackArrays(input: string[]) {
    let arr: string[][] = [[], [], [], [], [], [], [], [], []];
    let charIndex = [1, 5, 9, 13, 17, 21, 25, 29, 33];

    for (let i = input.length - 1; i >= 0; i--) {
        for (const p in charIndex) {
            let char = input[i].charAt(charIndex[p]);

            if (char !== " ") arr[p].push(char);
        }
    }
    return arr;
}

solve(moveInput);
