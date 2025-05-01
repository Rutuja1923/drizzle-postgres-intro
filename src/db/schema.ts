import * as p from "drizzle-orm/pg-core";

export const genderEnum = p.pgEnum("gender_enum", ["male", "female", "other"]);
export const roleEnum = p.pgEnum("role_enum", ["ADMIN", "USER"]);

export const userTable = p.pgTable(
  "users",
  {
    userId: p.uuid("user_id").primaryKey().defaultRandom(),
    firstName: p.varchar("first_name", { length: 255 }).notNull(),
    lastName: p.varchar("last_name", { length: 255 }).notNull(),
    age: p.integer().notNull(),
    email: p.text("email").notNull().unique(),
    phoneNumber: p.varchar("phone_number", { length: 15 }),
    gender: genderEnum("gender").notNull(),
    role: roleEnum("role").default("USER").notNull(),
  },
  (table) => [p.index("email_index").on(table.email)]
);

export const userPreferencesTable = p.pgTable("userPrefereces", {
  userId: p.uuid("user_id").primaryKey().defaultRandom(),
  emailUpdates: p.boolean("email_updates").notNull().default(false),
  userRefId: p
    .uuid("user_ref_id")
    .references(() => userTable.userId)
    .notNull(),
});

export const postTable = p.pgTable("posts", {
  postId: p.uuid("post_id").primaryKey().defaultRandom(),
  title: p.varchar("title", { length: 255 }).notNull(),
  averageRating: p.real("average_rating").notNull().default(0),
  createdAt: p.timestamp("created_at").defaultNow().notNull(),
  updatedAt: p.timestamp("updated_at").defaultNow().notNull(),
  authorId: p
    .uuid("author_id")
    .references(() => userTable.userId)
    .notNull(),
});