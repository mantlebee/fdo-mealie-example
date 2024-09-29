import {
  createTableKey,
  LookupRelationColumn,
  Table,
} from "@mantlebee/ts-refada";

import { getColumnsCommon } from "./_common.js";
import { usersKey } from "./users.js";

export const shoppingListsKey = createTableKey("shopping_lists");

export const createShoppingListsTable = async (db) =>
  new Table(shoppingListsKey, [
    ...getColumnsCommon(true),
    new LookupRelationColumn("user_id", null, usersKey, "id"),
  ]);
