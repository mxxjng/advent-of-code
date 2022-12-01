export function handleTextData(data: Buffer) {
  let arr: { direction: string; number: number }[] = [];
  // split every text line into array item
  let inputArray = data.toString().split('\n');

  for (const i in inputArray) {
    const d = inputArray[i].split(' ');
    arr.push({
      direction: d[0],
      number: parseInt(d[1]),
    });
  }

  return arr;
}
