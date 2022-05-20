const { createReadStream, writeFileSync } = require("fs");

const FoodNutritionModel = require("./food.nutrition.model");

const streamf = createReadStream("./survey_food.json", {
  flags: "r",
  encoding: "utf-8",
});

let output = "";

streamf.on("data", (chunk) => {
  output += chunk.toString();
});

streamf.on("end", () => {
  let foodJson = JSON.parse(output);
  const newJson = [];

  foodJson.SurveyFoods.forEach((food) => {
    const foodNutrients = new FoodNutritionModel(food);
    const nutrientInformation = foodNutrients.nutrientInformation();

    const newFood = {
      foodName: food.description,
      fdcId: food.fdcId,
      ...nutrientInformation,
      publicationDate: food.publicationDate,
      addedBy: "Admin",
      addedOn: new Date().toJSON(),
    };

    newJson.push(newFood);
  });

  try {
    writeFileSync("./result.json", JSON.stringify({ surveyFoods: newJson }));
  } catch (error) {
    throw error;
  }
});
