import { DatabaseDefaultUsername } from "./config.js";
import { getDbConnection } from "./utils.js";

const { executeQuery, queryBuilders } = await getDbConnection();
for (const queryBuilder of queryBuilders) {
  console.log("Cleaning " + queryBuilder.tableName);
  if (queryBuilder.tableName === "users")
    await executeQuery(
      `DELETE FROM users WHERE username != '${DatabaseDefaultUsername}';`
    );
  else {
    const query = queryBuilder.getDeleteQuery();
    await executeQuery(query);
  }
}
