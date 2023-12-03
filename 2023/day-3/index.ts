import { loadTextfile, prepareLines } from "@utils/files";

const data = await loadTextfile("input.txt");
const lines = prepareLines(data);

let validNumbers: number[] = [];

function solve(input: string[]) {
    for (let i = 0; i < input.length; i++) {
        const match = input[i].match(/\d+/g);

        if (match) {
            match.forEach((number) => {
                const numberStartIndex = input[i].indexOf(number);
                const numberEndIndex = numberStartIndex + number.length - 1;

                // check if number has a symbol on the left or right
                const leftSymbol = input[i].charAt(numberStartIndex - 1);
                const rightSymbol = input[i].charAt(numberEndIndex + 1);

                // regex to find symbols except a-z, A-Z, 0-9 and .
                const regex = /[^0-9.]/;

                // check if number has a symbol on the left or right
                if (leftSymbol.match(regex) || rightSymbol.match(regex)) {
                    validNumbers.push(parseInt(number));
                    // if one check is true we can skip to the next number in the line
                    return;
                }

                // check if number has a symbol top or bottom or diagonally (pre or next line in array)
                for (let j = -1; j < number.length + 1; j++) {
                    const topSymbol = input[i - 1]?.charAt(
                        numberStartIndex + j
                    );
                    const bottomSymbol = input[i + 1]?.charAt(
                        numberStartIndex + j
                    );

                    // check if number has a symbol on the top or bottom (pre or next line in array)
                    if (topSymbol?.match(regex) || bottomSymbol?.match(regex)) {
                        validNumbers.push(parseInt(number));
                        // if one check is true we can skip to the next number in the line
                        return;
                    }
                }
            });
        }
    }
}

solve(lines);

console.log(validNumbers);

console.log(
    "Part 1",
    validNumbers.reduce((a, b) => a + b, 0)
);
