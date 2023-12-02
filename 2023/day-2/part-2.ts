import { loadTextfile, prepareLines } from "@utils/files";

const data = await loadTextfile("input.txt");
const lines = prepareLines(data);

function solve(lines: string[]) {
    return lines.reduce((prevValue, line) => {
        // gets all game sets
        const gameSets = line.split(":")[1].split(";");

        let blueResults: number[] = [];
        let greenResults: number[] = [];
        let redResults: number[] = [];

        // check if every game set is valid
        gameSets.forEach((set) => {
            // gets all results in a set
            const result = set.split(",");

            result.forEach((res) => {
                const match = res.match(/\d+/);

                // check what type the result is and push it to the correct array
                if (match) {
                    if (res.includes("red")) {
                        redResults.push(parseInt(match[0]));
                    } else if (res.includes("blue")) {
                        blueResults.push(parseInt(match[0]));
                    } else if (res.includes("green")) {
                        greenResults.push(parseInt(match[0]));
                    }
                }
            });
        });

        // get the highest value of each color and multiply them
        const power =
            Math.max(...blueResults) *
            Math.max(...greenResults) *
            Math.max(...redResults);

        return prevValue + power;
    }, 0);
}

console.log("part 2", solve(lines));
