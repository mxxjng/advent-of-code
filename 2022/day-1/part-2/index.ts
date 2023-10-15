import { loadTextfile } from "@utils/files";
import { getTotalCaloriesFromElves, handleTextData } from "../utils/utils";

const data = await loadTextfile("input.txt");

let calorieArray = handleTextData(data);

let totalCaloriesPerElfArray = getTotalCaloriesFromElves(calorieArray);

// find the three elves with the highest calories
const highestThreeElves = totalCaloriesPerElfArray
    .sort((a, b) => b - a)
    .slice(0, 3);

// sum the calories from the top three elves
const totalCalories = highestThreeElves.reduce((acc, val) => acc + val, 0);

console.log(`the solution is: ${totalCalories}`);
