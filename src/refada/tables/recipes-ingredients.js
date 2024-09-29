import {
  ConstantColumn,
  createTableKey,
  CustomColumn,
  IdColumn,
  LoremIpsumColumn,
  NumberColumn,
  Sqlite3TableDetail,
  TitleColumn,
} from "@mantlebee/ts-refada";
import { createSlug } from "@mantlebee/ts-core";
import { extractRandomItem } from "@mantlebee/ts-random";

import { getColumnsBase } from "./_common.js";
import { recipesKey } from "./recipes.js";

export const recipesIngredientsKey = createTableKey("recipes_ingredients");

export const createRecipesIngredientsTable = async (db, groupId) => {
  const foodIds = (await db.all("SELECT id from ingredient_foods")).map(
    (a) => a.id
  );
  const unitIds = (await db.all("SELECT id from ingredient_units")).map(
    (a) => a.id
  );
  const columnsBase = getColumnsBase(true);
  return new Sqlite3TableDetail(recipesIngredientsKey, recipesKey, (a) => [
    ...columnsBase,
    new CustomColumn("food_id", () => extractRandomItem(foodIds)),
    new LoremIpsumColumn("note", {
      paragraphs: 1,
      sentencesPerParagraph: { max: 3, min: 1 },
      wordsPerSentence: { max: 20, min: 5 },
    }),
    new CustomColumn("note_normalized", (a) =>
      createSlug(a.note).replace(/\-/g, " ")
    ),
    new IdColumn("position"),
    new NumberColumn("quantity", { max: 50, min: 1 }),
    new ConstantColumn("recipe_id", a.id),
    new TitleColumn("title", { maxLength: { max: 10, min: 5 } }),
    new CustomColumn("unit_id", () => extractRandomItem(unitIds)),
  ]);
};
