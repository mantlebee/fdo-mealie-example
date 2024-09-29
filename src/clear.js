import { getDbConnection } from "./utils.js";

const { executeQuery, queryBuilders } = await getDbConnection();
for (const queryBuilder of queryBuilders) {
  const query = queryBuilder.getDeleteQuery();
  if (query) {
    console.log("Cleaning " + queryBuilder.tableName);
    await executeQuery(query);
  }
}
