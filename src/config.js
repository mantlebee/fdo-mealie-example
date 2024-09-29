import {
  categoriesKey,
  cookbooksKey,
  recipeInstructionsKey,
  recipesIngredientsKey,
  recipesKey,
  shoppingListItemsKey,
  shoppingListsKey,
  tagsKey,
  toolsKey,
} from "./refada/tables/index.js";

/**
 * Seeding configuration.
 * This counts map defines how many rows must be generated.
 * Values can be a specific number or a range.
 * Tables don't present in this map have specific behaviour by MEALIE,
 * and are not listed here because they are managed in `refada/database.js`.
 */
export const DatabaseSeedingCounts = {
  [categoriesKey]: 5,
  [cookbooksKey]: 2,
  [recipeInstructionsKey]: { max: 5, min: 1 }, // for each recipe, because it's a detail table
  [recipesKey]: 10,
  [recipesIngredientsKey]: { max: 10, min: 5 }, // for each recipe, because it's a detail table
  [shoppingListItemsKey]: { max: 10, min: 1 },
  [shoppingListsKey]: 2,
  [tagsKey]: 20,
  [toolsKey]: 10,
};
