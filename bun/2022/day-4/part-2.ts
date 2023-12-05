import * as fs from "fs";

const input = fs.readFileSync("./input/input.txt").toString().split("\n");

function solve(input: string[]) {
    let count = 0;

    input.forEach((i) => {
        let firstRange = i.split(",")[0].split("-");
        let secondRange = i.split(",")[1].split("-");

        if (isOverlapping(firstRange, secondRange)) count++;
    });

    console.log(count);
}

function isOverlapping(pair1: string[], pair2: string[]) {
    return (
        (parseInt(pair1[0]) <= parseInt(pair2[1]) &&
            parseInt(pair1[1]) >= parseInt(pair2[0])) ||
        (parseInt(pair2[0]) <= parseInt(pair1[1]) &&
            parseInt(pair2[1]) >= parseInt(pair1[0]))
    );
}

solve(input);
