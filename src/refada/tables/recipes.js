/**
  "image" : null,
  "perform_time" : null,
*/

import {
  BooleanColumn,
  createTableKey,
  CustomColumn,
  LookupRelationColumn,
  LoremIpsumColumn,
  MultiselectionRelationColumn,
  NumberColumn,
  Sqlite3Table,
} from "@mantlebee/ts-refada";

import { getColumnsCommon } from "./_common.js";
import { usersKey } from "./users.js";
import { categoriesKey } from "./categories.js";
import { tagsKey } from "./tags.js";
import { toolsKey } from "./tools.js";

export const recipesKey = createTableKey("recipes");

export const createRecipesTable = async (db, groupId) =>
  new Sqlite3Table(recipesKey, [
    ...getColumnsCommon(groupId),
    new CustomColumn(
      "date_added",
      (a) => a.created_at.toISOString().split("T")[0]
    ),
    new LoremIpsumColumn("description", {
      paragraphs: { max: 3, min: 1 },
      sentencesPerParagraph: { max: 10, min: 3 },
      wordsPerSentence: { max: 20, min: 5 },
    }),
    new BooleanColumn("is_ocr_recipe"),
    new CustomColumn("name_normalized", (a) => a.slug.replace(/\-/g, " ")),
    new CustomColumn("description_normalized", (a) =>
      a.slug.replace(/\-/g, " ")
    ),
    new LookupRelationColumn("user_id", 0, usersKey, "id"),
    new NumberColumn("perform_time", { max: 240 }),
    new NumberColumn("prep_time", { max: 60 }),
    new NumberColumn("rating", { max: 5, nullable: true }),
    new LoremIpsumColumn("recipe_yield", {
      paragraphs: { max: 3, min: 1 },
      sentencesPerParagraph: { max: 10, min: 3 },
      wordsPerSentence: { max: 20, min: 5 },
    }),
    new CustomColumn("total_time", (a) => a.perform_time + a.prep_time),
    // Following columns are not defined in the table, but used for relating cookbooks with categories, tags, and tools
    new MultiselectionRelationColumn("categories", categoriesKey, "id"),
    new MultiselectionRelationColumn("tags", tagsKey, "id"),
    new MultiselectionRelationColumn("tools", toolsKey, "id"),
  ]);
