import {
  BooleanColumn,
  createTableKey,
  CustomColumn,
  DateColumn,
  EmailColumn,
  getFirstNameColumnValue,
  getLastNameColumnValue,
  getStringColumnValue,
  NumberColumn,
  SlugColumn,
  Sqlite3Table,
} from "@mantlebee/fake-data-only";

import { getColumnsCommon } from "./_common.js";

export const usersKey = createTableKey("users");

export const createUsersTable = async (db) =>
  new Sqlite3Table(usersKey, [
    ...getColumnsCommon(true),
    new CustomColumn("auth_method", () => "MEALIE"),
    new DateColumn("locked_at", { nullable: 20 }),
    new NumberColumn("login_attemps", { nullable: true, max: 5 }),
    new BooleanColumn("can_organize"),
    new BooleanColumn("can_invite"),
    new BooleanColumn("can_manage"),
    new BooleanColumn("advanced"),
    new BooleanColumn("admin"),
    new CustomColumn("password", () =>
      getStringColumnValue({ length: { max: 20, min: 15 } }).replace(
        /\"|\| '/g,
        ""
      )
    ),
    new CustomColumn("full_name", () => {
      const firstName = getFirstNameColumnValue();
      const lastName = getLastNameColumnValue();
      return firstName + " " + lastName;
    }),
    new SlugColumn("username", { sourceField: "full_name" }),
    new EmailColumn("email", (a) => ({
      firstNames: [a.full_name.split(" ")[0]],
      lastNames: [a.full_name.split(" ")[1]],
    })),
  ]);
