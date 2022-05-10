const { createReadStream, writeFileSync } = require("fs");

const streamf = createReadStream("./survey_foods.json", {
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
    const newFood = {
      foodName: food.description,
      foodNutrients: food.foodNutrients,
      foodAttributes: food.foodAttributes,
      fdcId: food.fdcId,
      publicationDate: food.publicationDate,
      addedBy: "Admin",
      addedOn: new Date().toJSON(),
    };

    newJson.push(newFood);
  });

  try {
    writeFileSync(
      "./survey-foods.json",
      JSON.stringify({ surveyFoods: newJson })
    );
  } catch (error) {
    throw error;
  }
});
