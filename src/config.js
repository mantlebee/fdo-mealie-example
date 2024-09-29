import {
  categoriesKey,
  cookbooksKey,
  recipeInstructionsKey,
  recipeSettingsKey,
  recipesIngredientsKey,
  recipesKey,
  shoppingListMultiPurposeLabelsKey,
  shoppingListItemsKey,
  shoppingListsKey,
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
  [shoppingListItemsKey]: { max: 10, min: 1 },
  [shoppingListMultiPurposeLabelsKey]: 21, // DON'T CHANGE! Exact number of labels
  [shoppingListsKey]: 2,
  [tagsKey]: 20,
  [toolsKey]: 10,
  [usersKey]: 5,
};
