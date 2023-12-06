package main

import (
	"testing"
)

func TestParseLine(t *testing.T) {
	tests := []struct {
		line     string
		expected []string
	}{
		{
			line:     "abc: 123 456 789",
			expected: []string{"123", "456", "789"},
		},
		{
			line:     "def: 987 654 321",
			expected: []string{"987", "654", "321"},
		},
	}

	for _, test := range tests {
		result := parseLine(test.line)
		if len(result) != len(test.expected) {
			t.Errorf("Expected %d elements, but got %d", len(test.expected), len(result))
		}
		for i, val := range result {
			if val != test.expected[i] {
				t.Errorf("Expected %s, but got %s", test.expected[i], val)
			}
		}
	}
}