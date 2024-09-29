import {
  BooleanColumn,
  ConstantColumn,
  createTableKey,
  CustomColumn,
  IdColumn,
  LookupRelationColumn,
  LoremIpsumColumn,
  NumberColumn,
  Sqlite3DetailTable,
} from "@mantlebee/ts-refada";

import { getColumnsBase } from "./_common.js";
import { ingredientFoodsKey } from "./ingredient_foods.js";
import { ingredientUnitsKey } from "./ingredient_units.js";
import { multiPurposeLabelsKey } from "./multi_purpose_labels.js";
import { shoppingListsKey } from "./shopping_lists.js";

export const shoppingListItemsKey = createTableKey("shopping_list_items");

export const createShoppingListItemsTable = async (db, groupId) => {
  const columnsBase = getColumnsBase();
  return new Sqlite3DetailTable(
    shoppingListItemsKey,
    shoppingListsKey,
    (shoppingList) => [
      ...columnsBase,
      new BooleanColumn("checked"),
      new LookupRelationColumn("food_id", null, ingredientFoodsKey, "id"),
      new BooleanColumn("is_food"),
      new BooleanColumn("is_ingredient"),
      new LookupRelationColumn("label_id", null, multiPurposeLabelsKey, "id"),
      new LoremIpsumColumn("note", {
        paragraphs: 1,
        sentencesPerParagraph: { max: 3, min: 1 },
        wordsPerSentence: { max: 20, min: 5 },
      }),
      new IdColumn("position"),
      new NumberColumn("quantity", { max: 20, min: 1 }),
      new ConstantColumn("shopping_list_id", shoppingList.id),
      new LookupRelationColumn("unit_id", null, ingredientUnitsKey, "id"),
    ]
  );
};
