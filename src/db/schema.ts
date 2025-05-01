import * as p from "drizzle-orm/pg-core";

export const genderEnum = p.pgEnum("gender_enum", ["male", "female", "other"]);

export const userTable = p.pgTable("user", {
  userId: p.uuid("user_id").primaryKey().defaultRandom(),
  firstName: p.varchar("first_name", { length: 255 }).notNull(),
  lastName: p.varchar("last_name", { length: 255 }).notNull(),
  age: p.integer().notNull(),
  email: p.text("email").notNull().unique(),
  phoneNumber: p.varchar("phone_number", { length: 15 }),
  gender: genderEnum("gender").notNull(),
});

//id2: serial("id2").primaryKey() --> import serial or p.serial
