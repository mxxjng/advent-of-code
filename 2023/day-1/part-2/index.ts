import { loadTextfile } from "@utils/files";

const data = await loadTextfile("input.txt");
const lines = data.split("\n");

const addNumber: Record<string, any> = {
    one: "one1one",
    two: "two2two",
    three: "three3three",
    four: "four4four",
    five: "five5five",
    six: "six6six",
    seven: "seven7seven",
    eight: "eight8eight",
    nine: "nine9nine",
};

console.log(
    lines
        .slice(0, lines.length - 1)
        .map((line) => {
            for (const key in addNumber) {
                line = line.replaceAll(key, addNumber[key]);
            }
            return line;
        })
        .reduce((acc, val) => {
            const match = val.match(/\d/g);

            if (match) {
                const firstNumber = match[0];
                const lastNumber = match[match.length - 1];
                const combinedNumber = parseInt(`${firstNumber}${lastNumber}`);

                return acc + combinedNumber;
            }

            return 0;
        }, 0)
);
