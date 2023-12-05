import * as fs from "fs";

const input = fs.readFileSync("./input/input.txt").toString().split("\n");

function solve(input: string[]) {
    let visibleTrees = 0;

    for (let i = 0; i < input.length; i++) {
        let row = input[i].split("\r")[0];

        // first and last rows are visible
        if (i === 0 || i === input.length - 1) {
            visibleTrees += row.length;
            continue;
        }

        for (let p = 0; p < row.length; p++) {
            // first and last trees are always visible
            if (p === 0 || p === row.length - 1) {
                visibleTrees++;
                continue;
            }

            let val = row[p];
            let remainingRight = row.substring(p + 1, row.length);
            let remainingLeft = row.substring(0, p);

            // check if tree is visible from the side
            if (
                isHigherThanRemaining(parseInt(val), remainingLeft) ||
                isHigherThanRemaining(parseInt(val), remainingRight)
            ) {
                visibleTrees++;
                continue;
            }

            // check if tree is visible from the top or bottom
            if (
                isHigherThanRemainingTop(parseInt(val), i, p) ||
                isHigherThanRemainingBottom(parseInt(val), i, p)
            ) {
                visibleTrees++;
                continue;
            }
        }
    }

    console.log(visibleTrees);
}

function isHigherThanRemainingTop(
    value: number,
    currentLineIndex: number,
    currentRowIndex
) {
    for (let p = currentLineIndex - 1; p >= 0; p--) {
        const v = parseInt(input[p].split("\r")[0][currentRowIndex]);

        if (value <= v) {
            return false;
        }
    }
    return true;
}

function isHigherThanRemainingBottom(
    value: number,
    currentLineIndex: number,
    currentRowIndex
) {
    for (let p = currentLineIndex + 1; p < input.length; p++) {
        const v = parseInt(input[p].split("\r")[0][currentRowIndex]);

        if (value <= v) {
            return false;
        }
    }
    return true;
}

function isHigherThanRemaining(value: number, remaining: string) {
    for (let p = 0; p < remaining.length; p++) {
        if (value <= parseInt(remaining[p])) {
            return false;
        }
    }

    return true;
}

solve(input);
