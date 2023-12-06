package main

import (
	"fmt"
	"max/advent-of-code/utils"
	"regexp"
	"strconv"
	"strings"
	"time"
)

type RaceResult struct {
	time     int
	distance int
}

func parseLine(line string) []string {
	return regexp.MustCompile(`\d+`).FindAllString(strings.Split(line, ":")[1], -1)
}

func createRaceResults(times []string, distances []string) []RaceResult {
	raceResults := []RaceResult{}

	for i, time := range times {
		convertedTime, _ := strconv.Atoi(time)
		convertedDistance, _ := strconv.Atoi(distances[i])

		raceResults = append(raceResults, RaceResult{time: convertedTime, distance: convertedDistance})
	}

	return raceResults
}

func calculateWinningWays(raceResult RaceResult) int {
	arr := []int{}
	winningWays := 0

	for i := 0; i <= raceResult.time; i++ {
		arr = append(arr, i)
	}

	for _, v := range arr {
		remainingSeconds := raceResult.time - v
		traveledDistance := v * remainingSeconds

		if traveledDistance > raceResult.distance {
			winningWays++
		}
	}

	return winningWays
}

func partOne(lines []string) int {
	times := parseLine(lines[0])
	distances := parseLine(lines[1])
	raceResults := createRaceResults(times, distances)

	winningWays := []int{}
	result := 1

	// check how many winning ways exist in each race
	for _, raceResult := range raceResults {
		winningWays = append(winningWays, calculateWinningWays(raceResult))
	}

	// multiply all winning ways
	for _, winningWay := range winningWays {
		result *= winningWay
	}

	return result

}

func partTwo(lines []string) int {
	times := parseLine(lines[0])
	distances := parseLine(lines[1])

	bigTime, _ := strconv.Atoi(strings.Join(times, ""))
	bigDistance, _ := strconv.Atoi(strings.Join(distances, ""))

	raceResult := RaceResult{time: bigTime, distance: bigDistance}

	return calculateWinningWays(raceResult)
}

func main() {
	lines := utils.LoadFile("./input.txt")

	startTime := time.Now()
	fmt.Println("Part 1", partOne(lines))
	elapsedTime := time.Now().Sub(startTime)
	fmt.Println("Part 1 took", elapsedTime)

	startTime2 := time.Now()
	fmt.Println("Part 2", partTwo(lines))
	elapsedTime2 := time.Now().Sub(startTime2)
	fmt.Println("Part 2 took", elapsedTime2)

	// Part 1 time: 84.875µs
	// Part 2 time: 591.483583ms
}
