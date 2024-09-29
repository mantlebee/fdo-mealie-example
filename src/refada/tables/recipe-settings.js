import {
  BooleanColumn,
  ConstantColumn,
  createTableKey,
  Sqlite3DetailTable,
} from "@mantlebee/ts-refada";

import { getColumnsBase } from "./_common.js";
import { recipesKey } from "./recipes.js";

export const recipeSettingsKey = createTableKey("recipe_settings");

export const createRecipeSettingsTable = async (db, groupId) => {
  const columnsBase = getColumnsBase(true);
  return new Sqlite3DetailTable(recipeSettingsKey, recipesKey, (a) => [
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
