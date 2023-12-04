import { loadTextfile } from "@utils/files";

const data = await loadTextfile("./input/input.txt");
const input = data.split("\n");

const scoreObject: Record<string, number> = {
    "A X": 3,
    "A Y": 4,
    "A Z": 8,
    "B X": 1,
    "B Y": 5,
    "B Z": 9,
    "C X": 2,
    "C Y": 6,
    "C Z": 7,
};

const score = input.reduce((acc, val) => {
    return acc + scoreObject[val];
}, 0);

console.log("Score is: " + score);
