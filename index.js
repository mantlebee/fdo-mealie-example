import { Sqlite3TableQueryBuilder } from "@mantlebee/ts-refada";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

import { createDatabase } from "./database/index.js";

const SEED = false;

const toSingular = (name) => name.replace(/ies$/, "y").replace(/s$/, "");

(async () => {
  const db = await open({
    driver: sqlite3.Database,
    filename: "data/mealie.db",
  });
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
  const clean = async () => {
    for (const queryBuilder of queryBuilders) {
      console.log("Cleaning " + queryBuilder.tableName);
      if (queryBuilder.tableName === "users")
        await db.exec(`DELETE FROM users WHERE username != 'admin';`);
      else {
        const query = queryBuilder.getDeleteQuery();
        await db.exec(query);
      }
    }
  };
  let lastTableName;
  try {
    await clean();
    if (SEED)
      for (const queryBuilder of queryBuilders) {
        lastTableName = queryBuilder.tableName;
        console.log("Seeding " + queryBuilder.tableName);
        const query = queryBuilder.getInsertQuery();
        if (query) await db.exec(query);
      }
    console.log("DONE!");
  } catch (error) {
    console.log("ERROR! Cleaning all tables");
    console.log("Last table name: " + lastTableName);
    console.log(error);
    await clean();
  }
})();
