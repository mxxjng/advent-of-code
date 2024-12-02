import { loadTextfile, prepareLines } from "@utils/files";

const data = await loadTextfile("input.txt");
const lines = prepareLines(data);

const testData = [
    "7 6 4 2 1",
    "1 2 7 8 9",
    "9 7 6 2 1",
    "1 3 2 4 5",
    "8 6 4 4 1",
    "1 3 6 7 9",
];

function prepareData(lines: string[]) {
    return lines.map((line) => {
        return line.split(" ").map((n) => parseInt(n));
    });
}

function partOne(lines: string[]) {
    let reports = prepareData(lines);
    let safeReports = 0;

    for (const report of reports) {
        let isSafe = true;
        let prevRes = 0;

        for (let i = 0; i < report.length; i++) {
            const curr = report[i];
            const next = report[i + 1];

            if (next) {
                const diff = Math.abs(curr - next);
                const res = curr - next;

                if (diff > 3 || diff < 1) {
                    isSafe = false;
                }

                if (res === 0) {
                    isSafe = false;
                }

                if ((res < 0 && prevRes > 0) || (res > 0 && prevRes < 0)) {
                    isSafe = false;
                }

                prevRes = res;
            }
        }

        if (isSafe) {
            safeReports++;
        }
    }

    return safeReports;
}

console.log(partOne(lines));
