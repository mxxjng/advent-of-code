package main

import (
	"fmt"
	"max/advent-of-code/utils"
	"sort"
	"strconv"
	"strings"
	"time"
)

type Hand struct {
	hand           string
	bid            int
	handNumber     []int
	handType       string
	handTypePoints int
}

var cardRanking = map[string]int{
	"A": 13,
	"K": 12,
	"Q": 11,
	"J": 10,
	"T": 9,
	"9": 8,
	"8": 7,
	"7": 6,
	"6": 5,
	"5": 4,
	"4": 3,
	"3": 2,
	"2": 1,
}

var handTypePoints = map[string]int{
	"fiveOfAKind":  7,
	"fourOfAKind":  6,
	"fullHouse":    5,
	"threeOfAKind": 4,
	"twoPair":      3,
	"onePair":      2,
	"highCard":     1,
}

func generateHandNumber(hand string) []int {
	handNumber := []int{}

	for _, card := range hand {
		handNumber = append(handNumber, cardRanking[string(card)])
	}

	return handNumber
}

func determineHandType(counter map[string]int, counterLength int) string {
	switch counterLength {
	case 5:
		return "highCard"
	case 4:
		return "onePair"
	case 3:
		for _, v := range counter {
			if v == 3 {
				return "threeOfAKind"
			}
		}
		return "twoPair"
	case 2:
		for _, v := range counter {
			if v == 4 {
				return "fourOfAKind"
			}
		}
		return "fullHouse"
	case 1:
		return "fiveOfAKind"
	default:
		return ""
	}
}

func generateArray(lines []string) []Hand {
	results := []Hand{}

	for _, line := range lines {
		hand := strings.Split(line, " ")[0]
		bid, _ := strconv.Atoi(strings.Split(line, " ")[1])
		handNumber := generateHandNumber(hand)

		// count occurrences of each card in a hand
		counter := countOccurrences(hand)
		counterLength := len(counter)

		// determine hand type of the hand
		handType := determineHandType(counter, counterLength)
		handTypePoints := handTypePoints[handType]

		results = append(results, Hand{
			hand:           hand,
			bid:            bid,
			handNumber:     handNumber,
			handType:       handType,
			handTypePoints: handTypePoints,
		})
	}

	return results
}

func countOccurrences(hand string) map[string]int {
	counter := map[string]int{}

	for _, card := range hand {
		_, exists := counter[string(card)]

		if exists {
			counter[string(card)]++
		} else {
			counter[string(card)] = 1
		}
	}

	return counter
}

func partOne(lines []string) int {
	results := generateArray(lines)
	sum := 0

	sort.Slice(results, func(i, j int) bool {
		// if the hand type points are the same, compare the hand numbers by the first biggest card
		if results[i].handTypePoints == results[j].handTypePoints {
			for k := 0; k < len(results[i].handNumber); k++ {
				if results[i].handNumber[k] == results[j].handNumber[k] {
					continue
				}

				return results[i].handNumber[k] < results[j].handNumber[k]
			}
		}

		// else compare the hand type points
		return results[i].handTypePoints < results[j].handTypePoints
	})

	// add rank to each hand and multiply it by the bid
	for i, r := range results {
		sum += (i + 1) * r.bid
	}

	return sum
}

func partTwo(lines []string) int {
	return 0
}

func main() {
	lines := utils.LoadFile("./input.txt")

	startTime := time.Now()
	fmt.Println("Part 1", partOne(lines))
	elapsedTime := time.Now().Sub(startTime)
	fmt.Println("Part 1 took", elapsedTime)

	// Part 1 time: 700µs
}
