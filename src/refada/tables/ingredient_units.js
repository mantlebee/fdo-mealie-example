import { createTableKey } from "@mantlebee/ts-refada";

import { getConstantTable } from "./_common.js";

export const ingredientUnitsKey = createTableKey("ingredient_units");

export const createIngredientUnitsTable = async (db) =>
  await getConstantTable(ingredientUnitsKey, db);
