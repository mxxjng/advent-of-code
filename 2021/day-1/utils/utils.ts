export function handleTextData(data: Buffer) {
  let arr: number[] = [];
  // split every text line into array item
  let inputArray = data.toString().split('\n');

  for (const i in inputArray) {
    // convert text into number in every array item
    let number = parseInt(inputArray[i].split('\r')[0]);
    arr.push(number);
  }

  return arr;
}
