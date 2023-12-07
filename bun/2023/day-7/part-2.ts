import { loadTextfile, prepareLines } from "@utils/files";
import { countOccurences, handTypeHandler, handTypeRanking } from "./part-1";

const data = await loadTextfile("input.txt");
const lines = prepareLines(data);

const individualCardRankingWithJoker: Record<string, number> = {
    A: 13,
    K: 12,
    Q: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
    J: 1,
};

function determineHandTypeWithJoker(hand: string) {
    const counter = countOccurences(hand);
    const counterLength = Object.keys(counter).length;
    const containsJoker = Object.keys(counter).find((card) => card === "J");

    if (containsJoker) {
        let numberOfJokers = counter["J"];

        if (numberOfJokers === 5) {
            return "fiveOfAKind";
        }

        // of joker appears 4 times card will be a five of a kind
        if (numberOfJokers === 4) {
            return "fiveOfAKind";
        }

        // if 3 jokers hand can become a fourof a kind or a five of a kind if rest is a pair
        if (numberOfJokers === 3) {
            if (counterLength === 2) return "fiveOfAKind";

            // if 3 jokers and 2 different cards then it will become a four of a kind
            return "fourOfAKind";
        }

        if (numberOfJokers === 2) {
            if (counterLength === 4) return "threeOfAKind";
            if (counterLength === 3) return "fourOfAKind";
            if (counterLength === 2) return "fiveOfAKind";
        }

        // if 5 different cards and one of them is a jokes then joker will become a pair
        if (numberOfJokers === 1) {
            if (counterLength === 5) return "onePair";
            if (counterLength === 4) return "threeOfAKind";
            if (counterLength === 3) {
                for (const occ in counter) {
                    // if one element has counter 3 it becomes a four of a kind
                    if (counter[occ] === 3) {
                        return "fourOfAKind";
                    }
                }
                return "fullHouse";
            }
            if (counterLength === 2) return "fiveOfAKind";
        }
    }

    // handles normal hands if no joker is present
    return handTypeHandler(counter, counterLength);
}

export function partTwo(lines: string[]) {
    return lines
        .map((d) => {
            const hand = d.split(" ")[0];
            const bid = parseInt(d.split(" ")[1]);

            // convert the hand result to a number based on the strength of each card
            const handNumber = [...hand].map((card) => {
                return individualCardRankingWithJoker[card];
            });

            const handType = determineHandTypeWithJoker(hand);
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

console.time("Part 2");
console.log("Part 2", partTwo(lines));
console.timeEnd("Part 2");

// Part 2: 3.83ms
/*
        const jokerPossibilities1 = [
            "2345J", // one joker and 4 different cards becomes one pair
            "2355J", // one joker and 3 different cards becomes three of a kind
            "3355J", // one joker and 2 different cards becomes a full house
            "3555J", // one joker and 2 different card becomes a four of a kind
            "5555J", // one joker and 1 different card becomes a five of a kind
        ];

        const jokerPossibilities2 = [
            "543JJ", // one joker and 3 different cards becomes three of a kind
            "255JJ", // one joker and 2 different cards becomes become four of a kind
            "555JJ", // one joker and 1 different cards becomes five of a kind
        ];

        const jokerPossibilities3 = [
            "45JJJ", // one joker and 2 different cards becomes four of a kind
            "55JJJ", // one joker and 1 different cards becomes five of a kind
        ];
*/
