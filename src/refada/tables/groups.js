import { createTableKey } from "@mantlebee/ts-refada";

import { getConstantTable } from "./_common.js";

export const groupsKey = createTableKey("groups");

export const createGroupsTable = async (db) =>
  await getConstantTable(groupsKey, db);
