import { getDbConnection } from "./utils.js";

const { executeQuery, queryBuilders } = await getDbConnection();
let lastTableName;
try {
  await import("./clear.js");
  for (const queryBuilder of queryBuilders) {
    lastTableName = queryBuilder.tableName;
    console.log("Seeding " + queryBuilder.tableName);
    const query = queryBuilder.getInsertQuery();
    if (query) await executeQuery(query);
  }
  console.log("DONE!");
} catch (error) {
  console.log(
    `ERROR 1/2 Something went wrong, during ${lastTableName} table seeding.`
  );
  console.log("ERROR 2/2 Cleaning all tables to undo changes.");
  console.log(error);
  await import("./clear.js");
}
