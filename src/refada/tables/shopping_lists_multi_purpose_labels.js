import {
  ConstantColumn,
  createTableKey,
  CustomColumn,
  IdColumn,
  Sqlite3TableDetail,
} from "@mantlebee/ts-refada";

import { getColumnsBase } from "./_common.js";
import { shoppingListsKey } from "./shopping_lists.js";

export const shoppingListMultiPurposeLabelsKey = createTableKey(
  "shopping_lists_multi_purpose_labels"
);

export const createshoppingListMultiPurposeLabelsTable = async (
  db,
  groupId
) => {
  const labelIds = (await db.all("SELECT id from multi_purpose_labels")).map(
    (a) => a.id
  );
  const shoppingListsMap = {};
  const columnsBase = getColumnsBase();
  return new Sqlite3TableDetail(
    shoppingListMultiPurposeLabelsKey,
    shoppingListsKey,
    (shoppingList) => [
      ...columnsBase,
      new IdColumn("position"),
      new ConstantColumn("shopping_list_id", shoppingList.id),
      new CustomColumn("label_id", () => {
        if (!shoppingListsMap[shoppingList.id])
          shoppingListsMap[shoppingList.id] = [...labelIds];
        return shoppingListsMap[shoppingList.id].pop();
      }),
    ]
  );
};
