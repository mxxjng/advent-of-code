import { loadTextfile } from "@utils/files";
import { getTotalCaloriesFromElves, handleTextData } from "../utils/utils";

const data = await loadTextfile("input.txt");

let calorieArray = handleTextData(data);

let totalCaloriesPerElfArray = getTotalCaloriesFromElves(calorieArray);

// find the elf with the highest selected calories
const highestCalories = Math.max(...totalCaloriesPerElfArray);

console.log(`solution is: ${highestCalories}`);
