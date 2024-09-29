import {
  BooleanColumn,
  createTableKey,
  LookupRelationColumn,
  NumberColumn,
  Table,
} from "@mantlebee/ts-refada";

import { getColumnsBase } from "./_common.js";
import { recipesKey } from "./recipes.js";
import { usersKey } from "./users.js";

export const usersToRecipesKey = createTableKey("users_to_recipes");

export const createUsersToRecipesTable = async (db) =>
  new Table(usersToRecipesKey, [
    ...getColumnsBase(),
    new BooleanColumn("is_favorite"),
    new NumberColumn("rating", { max: 5, min: 1 }),
    new LookupRelationColumn("recipe_id", null, recipesKey, "id"),
    new LookupRelationColumn("user_id", null, usersKey, "id"),
  ]);
