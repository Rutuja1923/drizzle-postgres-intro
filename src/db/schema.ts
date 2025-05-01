import * as p from "drizzle-orm/pg-core";

export const userTable = p.pgTable("user", {
  id: p.uuid("id").primaryKey().defaultRandom(),
  firstName: p.varchar("first_name", { length: 255 }).notNull(),
  lastName: p.varchar("last_name", { length: 255 }).notNull(),
  age: p.integer().notNull(),
  email: p.text("email"),
  phoneNumber: p.text("phone_number"),
});

//id2: serial("id2").primaryKey() --> import serial or p.serial
