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
  [categoriesKey]: 5,
  [cookbooksKey]: 2,
  [recipeInstructionsKey]: { max: 5, min: 1 }, // for each recipe, because it's a detail table
  [recipeSettingsKey]: 1, // for each recipe, because it's a detail table
  [recipesKey]: 10,
  [recipesIngredientsKey]: { max: 10, min: 5 }, // for each recipe, because it's a detail table
  [tagsKey]: 20,
  [toolsKey]: 10,
  [usersKey]: 5,
};
