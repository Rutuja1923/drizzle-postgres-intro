import { pgTable as table, uuid, integer, varchar } from "drizzle-orm/pg-core";

export const userTable = table("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  age: integer().notNull(),
});

//id2: serial("id2").primaryKey() --> import serial
