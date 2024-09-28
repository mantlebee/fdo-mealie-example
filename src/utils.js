import { Sqlite3TableQueryBuilder } from "@mantlebee/ts-refada";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

import { createDatabase } from "./refada/index.js";

const toSingular = (name) => name.replace(/ies$/, "y").replace(/s$/, "");

export async function getDbConnection() {
  const db = await open({
    driver: sqlite3.Database,
    filename: "data/mealie.db",
  });
  const executeQuery = (...args) => db.exec(...args);
  const database = await createDatabase(db);
  const queryBuilders = database.tables.map(
    (a) =>
      new Sqlite3TableQueryBuilder(
        a,
        database,
        ({ targetTable }) => `${a.name}_to_${targetTable.name}`,
        ({ sourceColumn, targetTable }, row) => {
          const sourceColumnName = toSingular(a.name) + "_id";
          const targetColumnName = toSingular(targetTable.name) + "_id";
          const sourceId = row.id;
          return row[sourceColumn.name].map((a) => ({
            [sourceColumnName]: sourceId,
            [targetColumnName]: a,
          }));
        }
      )
  );
  return { executeQuery, queryBuilders };
}
