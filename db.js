const { createReadStream } = require("fs");
const pg = require("pg");

const { timestampWithoutTimezone } = require("./dateCalc");

const { dbpass } = require("./config");

const Pool = pg.Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "food_nutrition",
  password: dbpass,
  port: 5400,
});

const data = (req, res) => {
  pool.query("SELECT * from foods", (error, result) => {
    if (error) {
      throw error;
    }
    res.send(result);
  });
};

const addFoods = (req, res) => {
  const streamf = createReadStream("./food-cleaned.json", {
    flags: "r",
    encoding: "utf-8",
  });

  let output = "";

  streamf.on("data", (chunk) => {
    output += chunk.toString();
  });

  streamf.on("end", () => {
    let foodJson = JSON.parse(output);

    foodJson.surveyFoods.forEach((food) => {
      const {
        foodName,
        fdcId,
        energy,
        totalFats,
        saturatedFats,
        monounsaturatedFats,
        polyunsaturatedFats,
        carbsTotal,
        fibre,
        sugars,
        protein,
        cholesterol,
        water,
        calcium,
        sodium,
        potassium,
        magnesium,
        phosphorus,
        iron,
        zinc,
        coppper,
        selenium,
        vitaminARAE,
        vitaminARetinol,
        vitaminACaroteneAlpha,
        vitaminACaroteneBeta,
        cryptoxanthinBeta,
        lycopene,
        luteinZeaxanthinCarotenoid,
        thiamineVitaminB1,
        riboflavinVitaminB2,
        niacinVitaminB3,
        vitaminB6,
        folatevitaminB9Total,
        folatevitaminB9Food,
        folatevitaminB9DFE,
        cobalaminVitaminB12,
        cobalaminVitaminB12Added,
        ascorbicAcidVitaminC,
        vitaminD,
        vitaminEAdded,
        alphaTocopherolvitaminE,
        vitaminK,
        choline,
        ethylAlcohol,
        caffeine,
        theobromine,
        publicationDate,
      } = food;

      pool.query(
        `INSERT INTO foods(food_name,fdc_id,energy,total_fats,
          saturated_fats,
          monosaturated_fats,
          polysaturated_fats,
          carbs_total,
          fibre,
          sugars,
          protein,
          cholesterol,
          water,
          calcium,
          sodium,
          potassium,
          magnesium,
          phosphorus,
          iron,
          zinc,
          copper,
          selenium,
          vitamin_a_rae,
          vitamin_a_retinol,
          vitamin_a_carotene_alpha,
          vitamin_a_carotene_beta,
          cryptoxanthin_beta,
          lycopene,
          lutein_zeaxanthin_carotenoid,
          thiamine_vitamin_b1,
          riboflavin_vitamin_b2,
          niacin_vitamin_b3,
          vitamin_b6,
          folate_vitamin_b9_Total,
          folate_vitamin_b9_food,
          folatevitamin_b9_dfe,
          cobalamin_vitamin_b12,
          cobalamin_vitamin_b12_added,
          ascorbic_acid_vitamin_c,
          vitamin_d,
          vitamin_e_added,
          alpha_tocopherol_vitamin_e,
          vitamin_k,
          choline,
          ethyl_alcohol,
          caffeine,
          theobromine,
          publication_date,
          added_by,
          added_on
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
            $11, $12, $13, $14, $15, $16, $17, $18, $19, 
            $20, $21, $22, $23, $24, $25, $26, $27, $28, $29,
             $30, $31, $32, $33, $34, $35, $36, $37, $38, $39,
             $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, CURRENT_TIMESTAMP)`,
        [
          foodName,
          fdcId,
          energy,
          totalFats,
          saturatedFats,
          monounsaturatedFats,
          polyunsaturatedFats,
          carbsTotal,
          fibre,
          sugars,
          protein,
          cholesterol,
          water,
          calcium,
          sodium,
          potassium,
          magnesium,
          phosphorus,
          iron,
          zinc,
          coppper,
          selenium,
          vitaminARAE,
          vitaminARetinol,
          vitaminACaroteneAlpha,
          vitaminACaroteneBeta,
          cryptoxanthinBeta,
          lycopene,
          luteinZeaxanthinCarotenoid,
          thiamineVitaminB1,
          riboflavinVitaminB2,
          niacinVitaminB3,
          vitaminB6,
          folatevitaminB9Total,
          folatevitaminB9Food,
          folatevitaminB9DFE,
          cobalaminVitaminB12,
          cobalaminVitaminB12Added,
          ascorbicAcidVitaminC,
          vitaminD,
          vitaminEAdded,
          alphaTocopherolvitaminE,
          vitaminK,
          choline,
          ethylAlcohol,
          caffeine,
          theobromine,
          timestampWithoutTimezone(publicationDate),
          "Admin",
        ],
        (error, result) => {
          if (error) {
            throw error;
          }
          console.log(foodName + "added");
        }
      );
    });

    res.send("all foods added");
  });
};

module.exports = {
  data,
  addFoods,
};
