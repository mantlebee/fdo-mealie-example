import {
  ConstantColumn,
  createTableKey,
  CustomColumn,
  IdColumn,
  LookupRelationColumn,
  LoremIpsumColumn,
  NumberColumn,
  Sqlite3DetailTable,
  TitleColumn,
} from "@mantlebee/ts-refada";
import { createSlug } from "@mantlebee/ts-core";

import { getColumnsBase } from "./_common.js";
import { ingredientFoodsKey } from "./ingredient_foods.js";
import { ingredientUnitsKey } from "./ingredient_units.js";
import { recipesKey } from "./recipes.js";

export const recipesIngredientsKey = createTableKey("recipes_ingredients");

export const createRecipesIngredientsTable = async (db, groupId) => {
  const columnsBase = getColumnsBase(true);
  return new Sqlite3DetailTable(recipesIngredientsKey, recipesKey, (a) => [
    ...columnsBase,
    new LookupRelationColumn("food_id", null, ingredientFoodsKey, "id"),
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
    new LookupRelationColumn("unit_id", null, ingredientUnitsKey, "id"),
  ]);
};
