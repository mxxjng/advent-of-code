import fs from 'fs';
import { handleTextData } from '../utils/utils';

fs.readFile('input.txt', (err, data) => {
  if (err) throw err;

  let arr = handleTextData(data);

  let gammaRate: string[] = [];
  let epsilonRate: string[] = [];

  for (const i in arr) {
    let count1 = 0;
    let count0 = 0;
    for (const p in arr[i]) {
      if (arr[i][p] === '0') {
        count0++;
      } else {
        count1++;
      }
    }

    if (count1 > count0) {
      gammaRate.push('1');
      epsilonRate.push('0');
    } else {
      gammaRate.push('0');
      epsilonRate.push('1');
    }
  }

  // convert binary values to decimal values
  let gammaRateDecimal = parseInt(gammaRate.join(''), 2);
  let epsilonRateDecimal = parseInt(epsilonRate.join(''), 2);

  const powerConsumption = gammaRateDecimal * epsilonRateDecimal;

  console.log(powerConsumption);
});
