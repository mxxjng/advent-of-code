import * as fs from "fs";

const input = fs.readFileSync("./input/input.txt").toString().split("\n");

function solve(input: string[]) {
    let score = 0;
    for (const i in input) {
        switch (input[i]) {
            case "A X":
                // A - Opponent Rock - X you Rock - draw
                score += 1 + 3;
                break;
            case "A Y":
                // A - Opponent Rock - Y you Paper - win
                score += 2 + 6;
                break;
            case "A Z":
                // A - Opponent Rock -  Z you Scissors - loss
                score += 3 + 0;
                break;
            case "B X":
                // B - Opponent Paper -  X you Rock - loss
                score += 1 + 0;
                break;
            case "B Y":
                // B - Opponent Paper -  Y you Paper - draw
                score += 2 + 3;
                break;
            case "B Z":
                // B - Opponent Paper -  Z you Scissors - win
                score += 3 + 6;
                break;
            case "C X":
                // C - Opponent Scissors -  X you rock - win
                score += 1 + 6;
                break;
            case "C Y":
                // C - Opponent Scissors -  Y you Paper - loss
                score += 2 + 0;
                break;
            case "C Z":
                // C - Opponent Scissors -  Z you Scissors - draw
                score += 3 + 3;
                break;

            default:
                break;
        }
    }
    console.log(score);
}

solve(input);
