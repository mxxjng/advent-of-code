export function handleTextData(data: string) {
    let arr: number[][] = [];
    // split every text line into array item
    let inputArray = data.split("\n");

    let helperArray: number[] = [];

    for (const i in inputArray) {
        // convert text into number in every array item
        let number = parseInt(inputArray[i].split("\r")[0]);

        if (isNaN(number)) {
            arr.push(helperArray);
            helperArray = [];
        } else {
            helperArray.push(number);
        }
    }

    return arr;
}

export function getTotalCaloriesFromElves(arr: number[][]) {
    let totalCaloriesPerElfArray: number[] = [];

    for (const i in arr) {
        // sum calories from every elf
        totalCaloriesPerElfArray.push(
            arr[i].reduce((acc, val) => acc + val, 0)
        );
    }

    return totalCaloriesPerElfArray;
}
