import {
  createTableKey,
  LookupRelationColumn,
  LoremIpsumColumn,
  NumberColumn,
  Sqlite3Table,
  TitleColumn,
} from "@mantlebee/fake-data-only";

import { getColumnsBase } from "./_common.js";
import { recipesKey } from "./recipes.js";

export const recipeInstructionsKey = createTableKey("recipe_instructions");

export const createRecipeInstructionsTable = async (db) =>
  new Sqlite3Table(recipeInstructionsKey, [
    ...getColumnsBase(true),
    new NumberColumn("position", { max: 0 }),
    new LookupRelationColumn("recipe_id", "", recipesKey, "id"),
    new LoremIpsumColumn("text", {
      paragraphs: { max: 2, min: 1 },
      sentencesPerParagraph: { max: 5, min: 1 },
      wordsPerSentence: { max: 20, min: 5 },
    }),
    new TitleColumn("title", { maxLength: { max: 20, min: 5 } }),
  ]);
