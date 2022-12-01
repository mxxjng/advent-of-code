import fs from 'fs';
import { getTotalCaloriesFromElves, handleTextData } from '../utils/utils';

fs.readFile('input.txt', (err, data) => {
  if (err) throw err;
  let arr = handleTextData(data);

  let totalCaloriesPerElfArray = getTotalCaloriesFromElves(arr);

  // find the elf with the highest selected calories
  const highestCalories = Math.max(...totalCaloriesPerElfArray);

  console.log(`solution is: ${highestCalories}`);
});
