import { BooleanColumn, createTableKey, Table } from "@mantlebee/ts-refada";

import { getColumnsCommon } from "./_common.js";

export const toolsKey = createTableKey("tools");

export const createToolsTable = async (db) =>
  new Table(toolsKey, [...getColumnsCommon(), new BooleanColumn("on_hand")]);
