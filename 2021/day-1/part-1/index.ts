import fs from 'fs';
import { handleTextData } from '../utils/utils';

fs.readFile('input.txt', (err, data) => {
  if (err) throw err;

  let arr = handleTextData(data);

  let incrementCounter = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[i + 1]) incrementCounter++;
  }

  console.log(incrementCounter);
});
