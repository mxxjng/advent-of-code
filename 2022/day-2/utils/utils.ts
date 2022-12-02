export function handleTextData(data: Buffer): string[] {
  return data.toString().split("\n");
}

export function getTotalCaloriesFromElves(arr: number[][]) {
  let totalCaloriesPerElfArray: number[] = [];

  for (const i in arr) {
    // sum calories from every elf
    totalCaloriesPerElfArray.push(arr[i].reduce((acc, val) => acc + val, 0));
  }

  return totalCaloriesPerElfArray;
}
