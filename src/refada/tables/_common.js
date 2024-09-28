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

export const getColumnsCommon = (groupId, excludeNameColumn = false) => {
  const commonColumns = [
    ...getColumnsBase(),
    new ConstantColumn("group_id", groupId),
  ];
  if (!excludeNameColumn)
    commonColumns.push(
      new TitleColumn("name", { maxLength: { max: 50, min: 10 } }),
      new SlugColumn("slug", { sourceField: "name" })
    );
  return commonColumns;
};
