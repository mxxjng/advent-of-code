import { loadTextfile, prepareLines } from "@utils/files";

const data = await loadTextfile("input.txt");
const lines = prepareLines(data);

let validGames: number[] = [];

lines.forEach((line) => {
    // get the id of the game as number
    const gameId = parseInt(line.split(":")[0].split(" ")[1]);
    // gets the all game results
    const gameResult = line.split(":")[1];

    // gets all game sets
    const gameSets = gameResult.split(";");

    const everyGameSetIsValid = gameSets.every((set) => {
        const result = set.trim().split(",");

        // check if every value in a game set is valid
        const everyValueIsValid = result.every((res) => {
            return checkIfResultIsValid(res);
        });

        // if every result is valid a gameset is valid
        return everyValueIsValid;
    });

    // if every game set is valid the game is valid
    if (everyGameSetIsValid) {
        validGames.push(gameId);
    }
});

console.log(
    "part 1",
    validGames.reduce((a, b) => a + b, 0)
);

// checks if a single result is valid
function checkIfResultIsValid(str: string) {
    const match = str.match(/\d+/);

    if (match) {
        const score = parseInt(match[0]);

        if (str.includes("red") && score > 12) {
            return false;
        } else if (str.includes("blue") && score > 14) {
            return false;
        } else if (str.includes("green") && score > 13) {
            return false;
        }

        return true;
    }
    return false;
}
