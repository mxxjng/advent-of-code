import * as fs from "fs";

const input = fs.readFileSync("./input/input.txt").toString().split("\n");

function solve(input: string[]) {
    let paths: string[] = [];
    let currentPath = -1;
    let test: any = {};

    for (const i of input) {
        const commands = i.replace("\r", "").split(" ");

        // cd
        if (commands[1] === "cd") {
            // navigate back
            if (commands[2] === "..") {
                if (paths.length > 0) {
                    paths.pop();
                    currentPath--;
                }
                continue;
            }

            if (currentPath === -1) {
                test = { name: commands[2], children: [], type: "dir" };
            }

            paths.push(commands[2]);
            currentPath++;
        }

        if (commands[0] === "dir") {
            // get parent object
        }

        if (!isNaN(parseInt(commands[0]))) {
            // get the parent object
        }
    }
    console.log("filetree:");
    console.log(test);
}

solve(input);
