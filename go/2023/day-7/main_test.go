package main

import (
	"testing"
)

func TestCountOccurences(t *testing.T) {
	tests := []struct {
		line     string
		expected map[string]int
	}{
		{
			line:     "KJJT23",
			expected: map[string]int{"K": 1, "J": 2, "T": 1, "2": 1, "3": 1},
		},
	}

	for _, test := range tests {
		result := countOccurrences(test.line)
		if len(result) != len(test.expected) {
			t.Errorf("Expected %d elements, but got %d", len(test.expected), len(result))
		}

		if result["K"] != test.expected["K"] {
			t.Errorf("Expected %d occurences of K, but got %d", test.expected["K"], result["K"])
		}
	}
}
