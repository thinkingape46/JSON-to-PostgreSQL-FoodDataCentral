/* eslint-disable space-before-function-paren */
class FoodNutritionModel {
  constructor(foodData) {
    const { foodNutrients } = foodData;

    this.nutrientKeywords = {
      energy: "Energy",
      totalFats: "Total lipid (fat)",
      saturatedFats: "Fatty acids, total saturated",
      monounsaturatedFats: "Fatty acids, total monounsaturated",
      polyunsaturatedFats: "Fatty acids, total polyunsaturated",
      carbsTotal: "Carbohydrate, by difference",
      fibre: "Fiber, total dietary",
      sugars: "Sugars, total including NLEA",
      protein: "Protein",
      cholesterol: "Cholesterol",
      water: "Water",
      calcium: "Calcium, Ca",
      sodium: "Sodium, Na",
      potassium: "Potassium, K",
      magnesium: "Magnesium, Mg",
      phosphorus: "Phosphorus, P",
      iron: "Iron, Fe",
      zinc: "Zinc, Zn",
      coppper: "Copper, Cu",
      selenium: "Selenium, Se",
      vitaminARAE: "Vitamin A, RAE",
      vitaminARetinol: "Retinol",
      vitaminACaroteneAlpha: "Carotene, alpha",
      vitaminACaroteneBeta: "Carotene, beta",
      cryptoxanthinBeta: "Cryptoxanthin, beta",
      lycopene: "Lycopene",
      luteinZeaxanthinCarotenoid: "Lutein + zeaxanthin",
      thiamineVitaminB1: "Thiamin",
      riboflavinVitaminB2: "Riboflavin",
      niacinVitaminB3: "Niacin",
      vitaminB6: "Vitamin B-6",
      folatevitaminB9Total: "Folate, total",
      folatevitaminB9Food: "Folate, food",
      folatevitaminB9DFE: "Folate, DFE",
      cobalaminVitaminB12: "Vitamin B-12",
      cobalaminVitaminB12Added: "Vitamin B-12, added",
      ascorbicAcidVitaminC: "Vitamin C, total ascorbic acid",
      vitaminD: "Vitamin D (D2 + D3)",
      vitaminEAdded: "Vitamin E, added",
      alphaTocopherolvitaminE: "Vitamin E (alpha-tocopherol)",
      vitaminK: "Vitamin K (phylloquinone)",
      choline: "Choline, total",
      ethylAlcohol: "Alcohol, ethyl",
      caffeine: "Caffeine",
      theobromine: "Theobromine",
    };

    this.foodNutrients = foodNutrients;
  }

  nutrientInformation() {
    const nutrients = {};
    Object.keys(this.nutrientKeywords).forEach((keyword) => {
      const nutrient = this.foodNutrients.find(
        (n) => n.nutrient.name === this.nutrientKeywords[keyword]
      );
      nutrients[keyword] = {
        label: this.nutrientKeywords[keyword],
        amount: nutrient.amount,
        unitName: nutrient.nutrient.unitName,
      };
    });

    return nutrients;
  }
}

module.exports = FoodNutritionModel;
