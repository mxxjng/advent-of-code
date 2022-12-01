import fs from 'fs';
import { handleTextData } from '../utils/utils';

fs.readFile('input.txt', (err, data) => {
  if (err) throw err;

  let arr = handleTextData(data);

  let incrementCounter = 0;

  for (let i = 0; i < arr.length; i++) {
    let currentSlidingWindow = arr[i] + arr[i + 1] + arr[i + 2];
    let nextSlidingWindow = arr[i + 1] + arr[i + 2] + arr[i + 3];

    if (currentSlidingWindow < nextSlidingWindow) incrementCounter++;
  }

  console.log(incrementCounter);
});
