import { createTableKey } from "@mantlebee/ts-refada";

import { getConstantTable } from "./_common.js";

export const multiPurposeLabelsKey = createTableKey("multi_purpose_labels");

export const createMultiPurposeLabelsTable = async (db, groupId) =>
  await getConstantTable(multiPurposeLabelsKey, db);
