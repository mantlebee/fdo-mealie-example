import { Sqlite3Database } from "@mantlebee/ts-refada";

import { DatabaseSeedingCounts } from "../config.js";
import {
  createCategoriesTable,
  createCookbooksTable,
  createGroupsTable,
  createIngredientFoodsTable,
  createIngredientUnitsTable,
  createMultiPurposeLabelsTable,
  createRecipeInstructionsTable,
  createRecipeSettingsTable,
  createRecipesIngredientsTable,
  createRecipesTable,
  createShoppingListItemsTable,
  createshoppingListMultiPurposeLabelsTable,
  createShoppingListsTable,
  createTagsTable,
  createToolsTable,
  createUsersTable,
  recipeSettingsKey,
  shoppingListMultiPurposeLabelsKey,
} from "./tables/index.js";

export const createDatabase = async (db) => {
  return new Sqlite3Database([
    await createCategoriesTable(db),
    await createCookbooksTable(db),
    await createGroupsTable(db),
    await createIngredientFoodsTable(db),
    await createIngredientUnitsTable(db),
    await createMultiPurposeLabelsTable(db),
    await createRecipeInstructionsTable(db),
    await createRecipeSettingsTable(db),
    await createRecipesIngredientsTable(db),
    await createRecipesTable(db),
    await createShoppingListItemsTable(db),
    await createshoppingListMultiPurposeLabelsTable(db),
    await createShoppingListsTable(db),
    await createTagsTable(db),
    await createToolsTable(db),
    await createUsersTable(db),
  ]).seed({
    ...DatabaseSeedingCounts,
    [recipeSettingsKey]: 1, // DON'T CHANGE! Each recipe must have one, and one only, settings row
    [shoppingListMultiPurposeLabelsKey]: 21, // DON'T CHANGE! Exact number of labels.
  });
};
