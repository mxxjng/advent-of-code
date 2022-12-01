import fs from 'fs';
import { getTotalCaloriesFromElves, handleTextData } from '../utils/utils';

fs.readFile('input.txt', (err, data) => {
  if (err) throw err;
  let arr = handleTextData(data);

  let totalCaloriesPerElfArray = getTotalCaloriesFromElves(arr);

  // find the three elves with the highest calories
  const highestThreeElves = totalCaloriesPerElfArray.sort((a, b) => b - a).slice(0, 3);

  // sum the calories from the top three elves
  const totalCalories = highestThreeElves.reduce((acc, val) => acc + val, 0);

  console.log(`the solution is: ${totalCalories}`);
});
