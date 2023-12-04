import * as fs from "fs";

const input = fs.readFileSync("./input/input.txt").toString().split("\n");

function solve(input: string[]) {
    let currentTopDistance = 0;

    for (let i = 0; i < input.length; i++) {
        let row = input[i].split("\r")[0];

        for (let p = 0; p < row.length; p++) {
            let val = row[p];
            let remainingRight = row.substring(p + 1, row.length);
            let remainingLeft = row.substring(0, p);

            let rightDistance = viewDistanceRight(
                parseInt(val),
                remainingRight
            );
            let leftDistance = viewDistanceLeft(parseInt(val), remainingLeft);
            let topDistance = viewDistanceTop(parseInt(val), i, p);
            let bottomDistance = viewDistanceBottom(parseInt(val), i, p);

            let totalDistance =
                leftDistance * rightDistance * bottomDistance * topDistance;

            if (totalDistance > currentTopDistance)
                currentTopDistance = totalDistance;
        }
    }

    console.log(currentTopDistance);
}

function viewDistanceTop(
    value: number,
    currentLineIndex: number,
    currentRowIndex
) {
    let distance = 0;

    if (currentLineIndex === 0) return 0;

    for (let p = currentLineIndex - 1; p >= 0; p--) {
        const v = parseInt(input[p].split("\r")[0][currentRowIndex]);

        if (value <= v) {
            distance++;
            return distance;
        }

        distance++;
    }
    return distance;
}

function viewDistanceBottom(
    value: number,
    currentLineIndex: number,
    currentRowIndex
) {
    let distance = 0;

    if (currentLineIndex === input.length - 1) return 0;

    for (let p = currentLineIndex + 1; p < input.length; p++) {
        const v = parseInt(input[p].split("\r")[0][currentRowIndex]);

        if (value <= v) {
            distance++;
            return distance;
        }
        distance++;
    }
    return distance;
}

function viewDistanceRight(value: number, remaining: string) {
    let distance = 0;

    if (remaining.length === 1) return 0;

    for (let p = 0; p < remaining.length; p++) {
        if (value <= parseInt(remaining[p])) {
            distance++;
            return distance;
        }
        distance++;
    }

    return distance;
}

function viewDistanceLeft(value: number, remaining: string) {
    let distance = 0;

    if (remaining.length === 1) return 0;

    for (let p = remaining.length - 1; p >= 0; p--) {
        if (value <= parseInt(remaining[p])) {
            distance++;
            return distance;
        }
        distance++;
    }

    return distance;
}

solve(input);
