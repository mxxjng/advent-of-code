import { loadTextfile, prepareLines } from "@utils/files";

const data = await loadTextfile("input.txt");
const lines = prepareLines(data);

function formatNodes(nodes: string[]) {
    return nodes.map((node) => {
        const [id, coordinates] = node.split("=");

        const [left, right]: any = coordinates.match(/\b[a-zA-Z0-9]+\b/g);

        return {
            name: id.trim(),
            left,
            right,
        };
    });
}

export function partOne(lines: string[]): number {
    const instructions = lines[0].split("");
    const inputs = lines.slice(2);
    const nodes = formatNodes(inputs);

    let steps = 0;
    let currentIndex = 0;
    let currentNode = "AAA";
    let stepHistory = ["AAA"];

    while (true) {
        // gets the current instruction to choose left or right
        const currentInstruction = instructions[currentIndex];

        // gets the current node from the array of nodes
        const n: any = nodes.find((node) => node.name === currentNode);
        steps++;

        // if the current instruction is R then move to the right node of the current node in the array and make it the new current node
        if (currentInstruction === "R") {
            currentNode = n.right;
            stepHistory.push(currentNode);
        } else {
            currentNode = n.left;
            stepHistory.push(currentNode);
        }

        // if the current node is ZZZ then break out of the loop
        if (currentNode === "ZZZ") {
            break;
        }

        // Move to the next index or reset to 0 if at the end
        currentIndex = (currentIndex + 1) % instructions.length;
    }

    return steps;
}

const exampleData = [
    "LR",
    "",
    "11A = (11B, XXX)",
    "11B = (XXX, 11Z)",
    "11Z = (11B, XXX)",
    "22A = (22B, XXX)",
    "22B = (22C, 22C)",
    "22C = (22Z, 22Z)",
    "22Z = (22B, 22B)",
    "XXX = (XXX, XXX)",
];

// works for example data but ends in an infinite loop for the real data
function partTwo(lines: string[]): number {
    const instructions = lines[0].split("");
    const inputs = lines.slice(2);
    const nodes = formatNodes(inputs);

    let steps = 0;
    let currentIndex = 0;

    const ways = [...nodes]
        .filter((node) => node.name.endsWith("A"))
        .map((node, i) => {
            return {
                index: i,
                currentNode: node.name,
                stepHistory: [node.name],
            };
        });

    while (true) {
        // gets the current instruction to choose left or right
        const currentInstruction = instructions[currentIndex];

        ways.forEach((way) => {
            const n: any = nodes.find((node) => node.name === way.currentNode);

            if (currentInstruction === "R") {
                way.currentNode = n.right;
                way.stepHistory.push(way.currentNode);
            } else {
                way.currentNode = n.left;
                way.stepHistory.push(way.currentNode);
            }
        });

        steps++;

        // if all ways end with Z then break out of the loop
        if (
            ways
                .map((way) => way.currentNode)
                .every((node) => node.endsWith("Z"))
        ) {
            break;
        }

        console.log(
            "current ways",
            ways.map((way) => way.currentNode)
        );

        // Move to the next index or reset to 0 if at the end
        currentIndex = (currentIndex + 1) % instructions.length;
    }

    console.log(
        "final ways",
        ways.map((way) => way.currentNode)
    );

    return steps;
}

console.time("Part 1 runtime");
console.log("Part 1:", partOne(lines));
console.timeEnd("Part 1 runtime");

console.time("Part 2 runtime");
console.log("Part 2:", partTwo(exampleData));
console.timeEnd("Part 2 runtime");

// Part 1: 63ms
