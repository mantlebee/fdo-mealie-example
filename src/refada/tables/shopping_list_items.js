import {
  BooleanColumn,
  ConstantColumn,
  createTableKey,
  CustomColumn,
  IdColumn,
  LoremIpsumColumn,
  NumberColumn,
  Sqlite3TableDetail,
} from "@mantlebee/ts-refada";

import { getColumnsBase } from "./_common.js";
import { shoppingListsKey } from "./shopping_lists.js";
import { extractRandomItem } from "@mantlebee/ts-random";

export const shoppingListItemsKey = createTableKey("shopping_list_items");

export const createShoppingListItemsTable = async (db, groupId) => {
  const foodIds = (await db.all("SELECT id from ingredient_foods")).map(
    (a) => a.id
  );
  const labelIds = (await db.all("SELECT id from multi_purpose_labels")).map(
    (a) => a.id
  );
  const unitIds = (await db.all("SELECT id from ingredient_units")).map(
    (a) => a.id
  );
  const columnsBase = getColumnsBase();
  return new Sqlite3TableDetail(
    shoppingListItemsKey,
    shoppingListsKey,
    (shoppingList) => [
      ...columnsBase,
      new BooleanColumn("checked"),
      new BooleanColumn("is_food"),
      new BooleanColumn("is_ingredient"),
      new CustomColumn("label_id", () => extractRandomItem(labelIds)),
      new LoremIpsumColumn("note", {
        paragraphs: 1,
        sentencesPerParagraph: { max: 3, min: 1 },
        wordsPerSentence: { max: 20, min: 5 },
      }),
      new IdColumn("position"),
      new NumberColumn("quantity", { max: 20, min: 1 }),
      new ConstantColumn("shopping_list_id", shoppingList.id),
      // Depend on is_food
      new CustomColumn("food_id", (a) =>
        a.is_food ? extractRandomItem(foodIds) : null
      ),
      new CustomColumn("unit_id", (a) =>
        a.is_food ? extractRandomItem(unitIds) : null
      ),
    ]
  );
};
