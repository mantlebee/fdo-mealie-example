import {
  BooleanColumn,
  createTableKey,
  IdColumn,
  LoremIpsumColumn,
  MultiselectionRelationColumn,
  Sqlite3Table,
} from "@mantlebee/ts-refada";

import { getColumnsCommon } from "./_common.js";
import { categoriesKey } from "./categories.js";
import { tagsKey } from "./tags.js";
import { toolsKey } from "./tools.js";

export const cookbooksKey = createTableKey("cookbooks");

export const createCookbooksTable = async (db) =>
  new Sqlite3Table(cookbooksKey, [
    ...getColumnsCommon(),
    new LoremIpsumColumn("description", {
      paragraphs: { max: 3, min: 1 },
      sentencesPerParagraph: { max: 10, min: 3 },
      wordsPerSentence: { max: 20, min: 5 },
    }),
    new IdColumn("position"),
    new BooleanColumn("public"),
    new BooleanColumn("require_all_categories"),
    new BooleanColumn("require_all_tags"),
    new BooleanColumn("require_all_tools"),
    // Following columns are not defined in the table, but used for relating cookbooks with categories, tags, and tools
    new MultiselectionRelationColumn("categories", categoriesKey, "id"),
    new MultiselectionRelationColumn("tags", tagsKey, "id"),
    new MultiselectionRelationColumn("tools", toolsKey, "id"),
  ]);
