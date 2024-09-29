import {
  ConstantColumn,
  createTableKey,
  Sqlite3Table,
} from "@mantlebee/ts-refada";

import { getColumnsCommon } from "./_common.js";
import { DatabaseDefaultUsername } from "../../config.js";

export const shoppingListsKey = createTableKey("shopping_lists");

export const createShoppingListsTable = async (db, groupId) => {
  const userId = (
    await db.all(
      `SELECT id from users WHERE username == '${DatabaseDefaultUsername}'`
    )
  ).map((a) => a.id)[0];
  return new Sqlite3Table(shoppingListsKey, [
    ...getColumnsCommon(groupId).filter((a) => a.name !== "slug"),
    new ConstantColumn("user_id", userId),
  ]);
};
