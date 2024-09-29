import {
  ConstantColumn,
  createTableKey,
  IdColumn,
  LoremIpsumColumn,
  Sqlite3TableDetail,
  TitleColumn,
} from "@mantlebee/ts-refada";

import { getColumnsBase } from "./_common.js";
import { recipesKey } from "./recipes.js";

export const recipeInstructionsKey = createTableKey("recipe_instructions");

export const createRecipeInstructionsTable = async (db, groupId) => {
  const columnsBase = getColumnsBase(true);
  return new Sqlite3TableDetail(recipeInstructionsKey, recipesKey, (a) => [
    ...columnsBase,
    new IdColumn("position"),
    new ConstantColumn("recipe_id", a.id),
    new LoremIpsumColumn("text", {
      paragraphs: { max: 2, min: 1 },
      sentencesPerParagraph: { max: 5, min: 1 },
      wordsPerSentence: { max: 20, min: 5 },
    }),
    new TitleColumn("title", { maxLength: { max: 20, min: 5 } }),
  ]);
};
