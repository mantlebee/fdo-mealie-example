import { Database } from "@mantlebee/ts-refada";

import { DatabaseSeedingCounts } from "../config.js";
import {
  createCategoriesTable,
  createCookbooksTable,
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
} from "./tables/index.js";

export const createDatabase = async (db) => {
  const groupId = (
    await db.all("SELECT id from groups WHERE slug == 'home'")
  ).map((a) => a.id)[0];
  return new Database([
    await createCategoriesTable(db, groupId),
    await createCookbooksTable(db, groupId),
    await createRecipeInstructionsTable(db, groupId),
    await createRecipeSettingsTable(db, groupId),
    await createRecipesIngredientsTable(db, groupId),
    await createRecipesTable(db, groupId),
    await createShoppingListItemsTable(db, groupId),
    await createshoppingListMultiPurposeLabelsTable(db, groupId),
    await createShoppingListsTable(db, groupId),
    await createTagsTable(db, groupId),
    await createToolsTable(db, groupId),
    await createUsersTable(db, groupId),
  ]).seed(DatabaseSeedingCounts);
};
