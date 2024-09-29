import { createTableKey } from "@mantlebee/ts-refada";

import { getConstantTable } from "./_common.js";

export const usersKey = createTableKey("users");

export const createUsersTable = async (db) => getConstantTable(usersKey, db);
