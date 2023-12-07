import { loadTextfile, prepareLines } from "@utils/files";

const data = await loadTextfile("input.txt");
const lines = prepareLines(data);

const handTypeRanking: Record<string, number> = {
    fiveOfAKind: 7,
    fourOfAKind: 6,
    fullHouse: 5,
    threeOfAKind: 4,
    twoPair: 3,
    onePair: 2,
    highCard: 1,
};

const individualCardRanking: Record<string, number> = {
    A: 13,
    K: 12,
    Q: 11,
    J: 10,
    T: 9,
    9: 8,
    8: 7,
    7: 6,
    6: 5,
    5: 4,
    4: 3,
    3: 2,
    2: 1,
};

// count how many times cards occur in a hand
function countOccurences(hand: string) {
    let counter: Record<string, number> = {};

    [...hand].forEach((h) => {
        if (counter[h]) {
            counter[h] += 1;
        } else {
            counter[h] = 1;
        }
    });

    return counter;
}

function determineHandType(hand: string) {
    let counter = countOccurences(hand);
    const counterLength = Object.keys(counter).length;

    switch (counterLength) {
        case 5:
            // if counter has 5 elements every element only occurs once in a hand
            return "highCard";
        case 4:
            // if counter has 4 elements hand has 1 pair and 3 none pairs
            return "onePair";
        case 3:
            // if counter has 3 elements it can be either three of a kind or 2 pairs
            for (const occ in counter) {
                // if one element has counter 3 its 3 of a kind
                if (counter[occ] === 3) {
                    return "threeOfAKind";
                }
            }
            return "twoPair";
        case 2:
            // if counter has 2 elements its either a 4 of a kind or a full house
            for (const occ in counter) {
                // if one element has counter 3 its 3 of a kind
                if (counter[occ] === 4) {
                    return "fourOfAKind";
                }
            }
            return "fullHouse";
        case 1:
            // if counter has 1 element it is a five pair
            return "fiveOfAKind";
        default:
            return "";
    }
}

export function partOne(lines: string[]) {
    return lines
        .map((d) => {
            const hand = d.split(" ")[0];
            const bid = parseInt(d.split(" ")[1]);

            // convert the hand result to a number based on the strength of each card
            const handNumber = [...hand].map((card) => {
                return individualCardRanking[card];
            });

            const handType = determineHandType(hand);
            const handTypePoints = handTypeRanking[handType];

            return {
                hand,
                bid,
                handNumber,
                handType,
                handTypePoints,
            };
        })
        .sort((a, b) => {
            // sorting a hand by the biggest first card
            if (a.handTypePoints === b.handTypePoints) {
                // if is same hand type sort by the highest first card
                for (let i = 0; i <= a.handNumber.length; i++) {
                    if (a.handNumber[i] === b.handNumber[i]) {
                        continue;
                    }

                    return a.handNumber[i] - b.handNumber[i];
                }
            }

            return a.handTypePoints - b.handTypePoints;
        })
        .map((item, i) => {
            return { ...item, rank: i + 1 };
        })
        .reduce((acc, val) => {
            const result = val.bid * val.rank;
            return acc + result;
        }, 0);
}

console.time("Part 1");
console.log("Part 1", partOne(lines));
console.timeEnd("Part 1");

// Part 1: 6.62ms
