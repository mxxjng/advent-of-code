import { loadTextfile } from "@utils/files";

const data = await loadTextfile("./input/input.txt");
const input = data.split("\n");

const scoreObject: Record<string, number> = {
    "A X": 4,
    "A Y": 8,
    "A Z": 3,
    "B X": 1,
    "B Y": 5,
    "B Z": 9,
    "C X": 7,
    "C Y": 2,
    "C Z": 6,
};

const score = input.reduce((acc, val) => {
    return acc + scoreObject[val];
}, 0);

console.log("Score is: " + score);
