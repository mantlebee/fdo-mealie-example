import { createTableKey } from "@mantlebee/ts-refada";

import { getConstantTable } from "./_common.js";

export const usersKey = createTableKey("users");

export const createUsersTable = async (db) => getConstantTable(usersKey, db);

// export const createUsersTable = async (db) =>
//   new Sqlite3Table(usersKey, [
//     ...getColumnsCommon(groupId, true),
//     new CustomColumn("auth_method", () => "MEALIE"),
//     new NumberColumn("login_attemps", { max: 5 }),
//     new DateColumn("locked_at", (a) => ({
//       nullable: a.login_attempts === 5 ? 100 : false,
//     })),
//     new ConstantColumn("cache_key", "1234"),
//     new BooleanColumn("can_organize"),
//     new BooleanColumn("can_invite"),
//     new BooleanColumn("can_manage"),
//     new BooleanColumn("advanced"),
//     new BooleanColumn("admin"),
//     new CustomColumn("password", () =>
//       getStringColumnValue({ length: { max: 20, min: 15 } }).replace(
//         /\"|\| '/g,
//         ""
//       )
//     ),
//     new CustomColumn("full_name", () => {
//       const firstName = getFirstNameColumnValue();
//       const lastName = getLastNameColumnValue();
//       return firstName + " " + lastName;
//     }),
//     new SlugColumn("username", { sourceField: "full_name" }),
//     new EmailColumn("email", (a) => ({
//       firstNames: [a.full_name.split(" ")[0]],
//       lastNames: [a.full_name.split(" ")[1]],
//     })),
//   ]);
