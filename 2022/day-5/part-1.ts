import * as fs from "fs";

const input = fs.readFileSync("./input/input.txt").toString().split("\n");

const stackInput = input.slice(0, 7);

let stacks = createStackArrays(stackInput);

function solve(input: string[]) {
    for (const i in input) {
        let commands = input[i].replace("\r", "").split(" ");
        let movementAmount = parseInt(commands[1]);
        let origin = parseInt(commands[3]) - 1;
        let destination = parseInt(commands[5]) - 1;

        // move as many objects as the movement amount
        for (let q = 0; q < movementAmount; q++) {
            let objectToMove = stacks[origin][stacks[origin].length - 1];

            // remove object from stack
            stacks[origin].pop();

            // add object to destination stack
            stacks[destination].push(objectToMove);
        }
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

solve(input.slice(10, input.length - 1));
