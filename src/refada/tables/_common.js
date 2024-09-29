import {
  ConstantColumn,
  DateColumn,
  GuidColumn,
  IdColumn,
  LookupRelationColumn,
  SlugColumn,
  Sqlite3ConstantTable,
  TitleColumn,
} from "@mantlebee/ts-refada";

import { groupsKey } from "./groups.js";

export const getColumnsBase = (useNumericId = false) => [
  useNumericId ? new IdColumn("id") : new GuidColumn("id"),
  new DateColumn("created_at"),
];

export const getColumnsCommon = (excludeSlugColumn = false) => {
  const commonColumns = [
    ...getColumnsBase(),
    new LookupRelationColumn("group_id", null, groupsKey, "id"),
    new TitleColumn("name", { maxLength: { max: 50, min: 10 } }),
  ];
  if (!excludeSlugColumn)
    commonColumns.push(new SlugColumn("slug", { sourceField: "name" }));
  return commonColumns;
};

export const getConstantTable = async (tableKey, db) => {
  const rows = await db.all(`SELECT * from ${tableKey.description}`);
  return new Sqlite3ConstantTable(tableKey, rows);
};
