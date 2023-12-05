package utils

import (
  "os"
  "fmt"
  "strings"
)

// import a text file as a string
func LoadFile(filename string) []string {
    file, err := os.ReadFile(filename)

	if err != nil {
		fmt.Println("Error reading file:", err)
    panic(err)
	}

	// Convert the content to a string and split it by lines
  lines := strings.Split(string(file), "\n")

  // Remove the last line if it's empty
  return lines[:len(lines)-1]
}
