import {
  categoriesKey,
  cookbooksKey,
  recipeInstructionsKey,
  recipeSettingsKey,
  recipesIngredientsKey,
  recipesKey,
  tagsKey,
  toolsKey,
  usersKey,
} from "./refada/tables/index.js";

export const DatabaseDefaultUsername = "demo";

export const DatabaseSeedingCounts = {
  [categoriesKey]: 20,
  [cookbooksKey]: 10,
  [recipeInstructionsKey]: 200,
  [recipeSettingsKey]: 1, // for each recipe, because it's a detail table
  [recipesKey]: 100,
  [recipesIngredientsKey]: { max: 12, min: 4 }, // for each recipe, because it's a detail table
  [tagsKey]: 30,
  [toolsKey]: 50,
  [usersKey]: 5,
};
