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

export const createRecipesTable = async (db) =>
  new Sqlite3Table(recipesKey, [
    ...getColumnsCommon(),
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
    new NumberColumn("prep_time", { max: 60 }),
    new NumberColumn("cook_time", { max: 240 }),
    new CustomColumn("total_time", (a) => a.prep_time + a.cook_time),
    new NumberColumn("rating", { max: 5, nullable: true }),
    // Following columns are not defined in the table, but used for relating cookbooks with categories, tags, and tools
    new MultiselectionRelationColumn("categories", categoriesKey, "id"),
    new MultiselectionRelationColumn("tags", tagsKey, "id"),
    new MultiselectionRelationColumn("tools", toolsKey, "id"),
  ]);
