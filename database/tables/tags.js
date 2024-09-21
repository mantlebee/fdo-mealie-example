import { createTableKey, Sqlite3Table } from "@mantlebee/fake-data-only";

import { getColumnsCommon } from "./_common.js";

export const tagsKey = createTableKey("tags");

export const createTagsTable = async (db) =>
  new Sqlite3Table(tagsKey, getColumnsCommon());
