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
  const streamf = createReadStream("./survey-foods-cleaned.json", {
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
      pool.query(
        `INSERT INTO foods(
          food_name,
          food_nutrients,
          food_attributes,
          fdc_id,
          publication_date,
          added_by,
          added_on
          ) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)`,
        [
          food.foodName,
          food.foodNutrients,
          food.foodAttributes,
          food.fdcId,
          timestampWithoutTimezone(food.publicationDate),
          "Admin",
        ],
        (error, result) => {
          if (error) {
            throw error;
          }
          console.log(food.description + "added");
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
