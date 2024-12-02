import { loadTextfile, prepareLines } from "@utils/files";

const data = await loadTextfile("input.txt");
const lines = prepareLines(data);

let firstArr = [];
let secondArr = [];

for (const line of lines) {
    const [first, second] = line.split("   ");

    firstArr.push(parseInt(first));
    secondArr.push(parseInt(second));
}

firstArr.sort((a, b) => a - b);
secondArr.sort((a, b) => a - b);

let diff = 0;

for (let i = 0; i < firstArr.length; i++) {
    diff += Math.abs(firstArr[i] - secondArr[i]);
}

console.log(diff);
