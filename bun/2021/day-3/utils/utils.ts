export function handleTextData(data: Buffer) {
  let arr: string[][] = [];
  // split every text line into array item
  let inputArray = data.toString().split('\n');
  let bitNumberLength = inputArray[0].length;

  for (let i = 0; i < bitNumberLength; i++) {
    let helperArray: string[] = [];
    for (let p = 0; p < inputArray.length; p++) {
      helperArray.push(inputArray[p].charAt(i));
    }

    arr.push(helperArray);
  }

  return arr;
}
