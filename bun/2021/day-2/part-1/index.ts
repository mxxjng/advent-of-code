import fs from 'fs';
import { handleTextData } from '../utils/utils';

fs.readFile('input.txt', (err, data) => {
  if (err) throw err;

  let arr = handleTextData(data);

  let horizontalPosition = 0;
  let depth = 0;

  for (const i in arr) {
    switch (arr[i].direction) {
      case 'forward':
        horizontalPosition += arr[i].number;
        break;
      case 'up':
        depth -= arr[i].number;
        break;
      case 'down':
        depth += arr[i].number;
        break;
      default:
        break;
    }
  }

  const result = horizontalPosition * depth;

  console.log(result);
});
