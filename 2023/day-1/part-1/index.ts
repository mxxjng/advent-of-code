import { loadTextfile } from "@utils/files";

const data = await loadTextfile("input.txt");
const lines = data.split("\n");

function solve(lines: string[]) {
    return lines.reduce((acc, val) => {
        // get all numbers from the line
        const match = val.match(/\d/g);

        if (match) {
            const firstNumber = match[0];
            const lastNumber = match[match.length - 1];
            const combinedNumber = parseInt(`${firstNumber}${lastNumber}`);

            return acc + combinedNumber;
        }

        return 0;
    }, 0);
}

console.log(solve(lines.slice(0, lines.length - 1)));
