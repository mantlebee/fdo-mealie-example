import {
  createTableKey,
  LookupRelationColumn,
  Sqlite3Table,
} from "@mantlebee/ts-refada";

import { getColumnsCommon } from "./_common.js";
import { usersKey } from "./users.js";

export const shoppingListsKey = createTableKey("shopping_lists");

export const createShoppingListsTable = async (db, groupId) =>
  new Sqlite3Table(shoppingListsKey, [
    ...getColumnsCommon(groupId).filter((a) => a.name !== "slug"),
    new LookupRelationColumn("user_id", null, usersKey, "id"),
  ]);
