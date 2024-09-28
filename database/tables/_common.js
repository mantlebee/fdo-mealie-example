import {
  ConstantColumn,
  DateColumn,
  GuidColumn,
  IdColumn,
  SlugColumn,
  TitleColumn,
} from "@mantlebee/ts-refada";

export const getColumnsBase = (useNumericId = false) => [
  useNumericId ? new IdColumn("id") : new GuidColumn("id"),
  new DateColumn("created_at"),
];

export const getColumnsCommon = (excludeNameColumn = false) => {
  const commonColumns = [
    ...getColumnsBase(),
    new ConstantColumn("group_id", "f40cacad9e5849ff9079bf62fc04b96f"),
  ];
  if (!excludeNameColumn)
    commonColumns.push(
      new TitleColumn("name", { maxLength: { max: 50, min: 10 } }),
      new SlugColumn("slug", { sourceField: "name" })
    );
  return commonColumns;
};
