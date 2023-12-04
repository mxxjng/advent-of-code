import { loadTextfile, prepareLines } from "@utils/files";

const data = await loadTextfile("input.txt");
const lines = prepareLines(data);

const part1 = lines
    .map((line) => {
        const winningNumbers = line
            .split(":")[1]
            .split("|")[0]
            .match(/\d+/g)
            ?.map((num) => parseInt(num));

        const drawnNumbers = line
            .split(":")[1]
            .split("|")[1]
            .match(/\d+/g)
            ?.map((num) => parseInt(num));

        return drawnNumbers
            ?.map((drawnNumber) => {
                const isWinningNumber = winningNumbers?.some(
                    (winningNumber) => winningNumber === drawnNumber
                );

                return isWinningNumber ? drawnNumber : null;
            })
            ?.filter((num) => num !== null)
            ?.reduce((a, b, i) => (i === 0 ? a + 1 : a * 2), 0);
    })
    ?.reduce((a, b) => a + b, 0);

console.log("Part 1:", part1);

const cards: any = [];

const part2 = lines.map((line, lineIndex) => {
    const winningNumbers = line
        .split(":")[1]
        .split("|")[0]
        .match(/\d+/g)
        ?.map((num) => parseInt(num));

    const drawnNumbers = line
        .split(":")[1]
        .split("|")[1]
        .match(/\d+/g)
        ?.map((num) => parseInt(num));

    const copiedCardIndexes = drawnNumbers
        ?.map((drawnNumber) => {
            const isWinningNumber = winningNumbers?.some(
                (winningNumber) => winningNumber === drawnNumber
            );

            return isWinningNumber ? drawnNumber : null;
        })
        ?.filter((num) => num !== null)
        .map((num, winninNumberIndex) => {
            return lineIndex + winninNumberIndex + 1;
        });

    cards.push({
        name: lineIndex,
        matches: copiedCardIndexes?.length,
        processed: false,
    });

    return 0;
});

// this part comes from the solutions thread
// check out why this works
let index = 0;
while (index < cards.length) {
    let name = cards[index].name;
    for (let i = 0; i < cards[index].matches; i++) {
        cards.push({
            name: cards[name + i + 1].name,
            matches: cards[name + i + 1].matches,
            processed: false,
        });
    }
    cards[index].processed = true;
    index++;
}

console.log(`Part 2: ${cards.length} cards`);
