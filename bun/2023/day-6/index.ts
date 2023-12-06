import { loadTextfile, prepareLines } from "@utils/files";

type RaceResult = {
    time: number;
    distance: number;
};

const data = await loadTextfile("input.txt");
const lines = prepareLines(data);

const times = parseLine(lines[0]);
const distances = parseLine(lines[1]);

const bigTime = parseInt(times.join(""));
const bigDistance = parseInt(distances.join(""));

const raceResults = times.map((time, i) => {
    return {
        time,
        distance: distances[i],
    };
});

export function parseLine(line: string) {
    return line.split(":")[1].match(/\d+/g)?.map(Number) as number[];
}

export function partOne(lines: RaceResult[]) {
    return lines.map(calculateWinningWays).reduce((acc, val) => acc * val, 1);
}

export function calculateWinningWays({ time, distance }: RaceResult) {
    // get an array of every second of the time of the race
    return Array.from(Array(time + 1).keys()).reduce((acc, val) => {
        const remainingTravelingSeconds = time - val;
        const traveledDistance = val * remainingTravelingSeconds;

        return traveledDistance > distance ? acc + 1 : acc;
    }, 0);
}

console.time("Part 1");
console.log("Part 1", partOne(raceResults));
console.timeEnd("Part 1");

console.time("Part 2");
console.log(
    "Part 2",
    calculateWinningWays({ time: bigTime, distance: bigDistance })
);
console.timeEnd("Part 2");

// Part 1 time: 2.57ms
// Part 2 time: 1397.42ms
