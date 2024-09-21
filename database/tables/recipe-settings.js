import {
  BooleanColumn,
  ConstantColumn,
  createTableKey,
  Sqlite3TableDetail,
} from "@mantlebee/fake-data-only";

import { getColumnsBase } from "./_common.js";
import { recipesKey } from "./recipes.js";

export const recipeSettingsKey = createTableKey("recipe_settings");

export const createRecipeSettingsTable = async (db) => {
  const columnsBase = getColumnsBase(true);
  return new Sqlite3TableDetail(recipeSettingsKey, recipesKey, (a) => [
    ...columnsBase,
    new BooleanColumn("disable_amount"),
    new BooleanColumn("disable_comments"),
    new BooleanColumn("landscape_view"),
    new BooleanColumn("locked"),
    new BooleanColumn("public"),
    new ConstantColumn("recipe_id", a.id),
    new BooleanColumn("show_assets"),
    new BooleanColumn("show_nutrition"),
  ]);
};
