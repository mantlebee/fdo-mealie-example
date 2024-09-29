import {
  ConstantColumn,
  createTableKey,
  CustomColumn,
  DetailTable,
  IdColumn,
} from "@mantlebee/ts-refada";

import { getColumnsBase } from "./_common.js";
import { multiPurposeLabelsKey } from "./multi_purpose_labels.js";
import { shoppingListsKey } from "./shopping_lists.js";

export const shoppingListMultiPurposeLabelsKey = createTableKey(
  "shopping_lists_multi_purpose_labels"
);

export const createshoppingListMultiPurposeLabelsTable = async (db) => {
  const labelIds = (
    await db.all(`SELECT id from ${multiPurposeLabelsKey.description}`)
  ).map((a) => a.id);
  const shoppingListsMap = {};
  const columnsBase = getColumnsBase();
  return new DetailTable(
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
