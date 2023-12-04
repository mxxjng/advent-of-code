package main

import (
	"fmt"
	"max/advent-of-code/utils"
	"regexp"
	"strconv"
	"strings"
)

func checkIfIsValidResult(result string) bool {
	re := regexp.MustCompile(`\d+`)
	matches := re.FindAllString(result, -1)

  score, _ := strconv.Atoi(matches[0])

  // refactor to one if statement
  if strings.Contains(result, "red") && score > 12 {
    return false
  } else if strings.Contains(result, "blue") && score > 14 {
    return false
  } else if strings.Contains(result, "green") && score > 13 {
    return false
  }

  return true
}

func part_one(lines []string) int {
validGames := []int{}

  for _, line := range lines {
    game := strings.Split(line, ":")
    sets := strings.Split(game[1], ";")

    for _, set := range sets {
      results := strings.Split(set, ",")

      for _, result := range results {
        fmt.Println(result)
        if checkIfIsValidResult(result) {
          // todo: add number of the game if to the validGames array
          validGames = append(validGames, 1)
          // todo go te next game loop
        }
      }

      fmt.Println(set)
    }

  }

  result := 0
  for _, validGame := range validGames {
    result += validGame
  }

  return result
}

func part_two(lines []string) int {
  for _, line := range lines {
    fmt.Println(line)
  }

  return 0
}

func main() {
  lines := utils.LoadFile("input.txt")

  fmt.Println("Part 1", part_one(lines))
  //fmt.Println("Part 2", part_two(lines))
}
