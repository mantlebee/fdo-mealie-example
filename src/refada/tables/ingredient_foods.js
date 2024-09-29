import { createTableKey } from "@mantlebee/ts-refada";

import { getConstantTable } from "./_common.js";

export const ingredientFoodsKey = createTableKey("ingredient_foods");

export const createIngredientFoodsTable = async (db, groupId) =>
  await getConstantTable(ingredientFoodsKey, db);
