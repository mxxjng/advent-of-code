import * as fs from "fs";

const input = fs.readFileSync("./input/input.txt");

const lines = String(input).split(/\r?\n/);
const dirs: any = {};
const parserPath = [];

for (const line of lines) {
    if (/\d+\s\w+/.test(line)) {
        const fileSize = Number(line.match(/\d+/)[0]);

        const path = [];

        parserPath.forEach((dir) => {
            path.push(dir);

            const dirTotal = dirs[path.join("/")] ?? 0;
            dirs[path.join("/")] = dirTotal + fileSize;
        });
    } else if (/\$ cd/.test(line)) {
        const [_, _command, param] = line.split(" ");

        param === ".." ? parserPath.pop() : parserPath.push(param);
    }
}

const part1 = Object.values(dirs).reduce(
    (total: any, dirSize: any) => (dirSize <= 100000 ? total + dirSize : total),
    0
);

console.log(part1);
