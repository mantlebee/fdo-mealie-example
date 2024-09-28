import {
  BooleanColumn,
  createTableKey,
  Sqlite3Table,
} from "@mantlebee/ts-refada";

import { getColumnsCommon } from "./_common.js";

export const toolsKey = createTableKey("tools");

export const createToolsTable = async (db, groupId) =>
  new Sqlite3Table(toolsKey, [
    ...getColumnsCommon(groupId),
    new BooleanColumn("on_hand"),
  ]);
