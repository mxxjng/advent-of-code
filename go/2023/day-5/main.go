package main

import (
	"fmt"
	"max/advent-of-code/utils"
	"regexp"
	"strconv"
	"strings"
)

var categories = [7]string{"seed-to-soil map:", "soil-to-fertilizer map:", "fertilizer-to-water map:", "water-to-light map:", "light-to-temperature map:", "temperature-to-humidity map:", "humidity-to-location map:"}

// takes a string and returns an array of numbers out of the numbers in the string
func createNumberArray(line string) ([]int, error) {
	numbers := regexp.MustCompile(`\d+`).FindAllString(line, -1)
	numArr := []int{}

	if numbers != nil {
		for _, num := range numbers {
			n, _ := strconv.Atoi(num)
			numArr = append(numArr, n)
		}

		return numArr, nil
	}

	return numArr, fmt.Errorf("No numbers found in string")
}

func part_one(lines []string) int {
	seeds := regexp.MustCompile(`\d+`).FindAllString(strings.Split(lines[0], ":")[1], -1)

	// current category that we are parsing
	currentCategory := ""

	seedToSoilData := [][]int{}
	soilToFertilizer := [][]int{}

	for _, line := range lines {
		isHeader := false

		// if line is a header, set currentCategory
		for _, category := range categories {
			if strings.HasPrefix(line, category) {
				currentCategory = category
				isHeader = true
			}
		}

		if isHeader {
			continue
		}

		// based on currentCategory, add data to appropriate array
		if currentCategory == "seed-to-soil map:" {
			numArr, err := createNumberArray(line)

			if err != nil {
				seedToSoilData = append(seedToSoilData, numArr)
			}
		}

		if currentCategory == "soil-to-fertilizer map:" {
			numArr, err := createNumberArray(line)

			if err != nil {
				soilToFertilizer = append(soilToFertilizer, numArr)
			}
		}

	}

	fmt.Println("seed-to-soil", seedToSoilData)
	fmt.Println("seed-to-fertilizer", soilToFertilizer)
	fmt.Println("seeds", seeds)

	return 0
}

func main() {
	lines := utils.LoadFile("./example.txt")

	fmt.Println("Part 1", part_one(lines))
}
