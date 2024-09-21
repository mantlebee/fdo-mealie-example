import { Database } from "@mantlebee/fake-data-only";

import {
  categoriesKey,
  createCategoriesTable,
  cookbooksKey,
  createCookbooksTable,
  recipesKey,
  createRecipesTable,
  tagsKey,
  createTagsTable,
  toolsKey,
  createToolsTable,
  usersKey,
  createUsersTable,
  createRecipesIngredientsTable,
  createRecipeSettingsTable,
  recipeSettingsKey,
  recipesIngredientsKey,
} from "./tables/index.js";
import {
  createRecipeInstructionsTable,
  recipeInstructionsKey,
} from "./tables/recipe-instructions.js";

export const createDatabase = async (db) =>
  new Database([
    await createCategoriesTable(db),
    await createCookbooksTable(db),
    await createRecipeInstructionsTable(db),
    await createRecipeSettingsTable(db),
    await createRecipesIngredientsTable(db),
    await createRecipesTable(db),
    await createTagsTable(db),
    await createToolsTable(db),
    await createUsersTable(db),
  ]).seed({
    [categoriesKey]: 20,
    [cookbooksKey]: 10,
    [recipeInstructionsKey]: 200,
    [recipeSettingsKey]: 1, // for each recipe, because it's a detail table
    [recipesKey]: 100,
    [recipesIngredientsKey]: 5, // for each recipe, because it's a detail table
    [tagsKey]: 30,
    [toolsKey]: 50,
    [usersKey]: 5,
  });
