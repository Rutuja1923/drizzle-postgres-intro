import { relations } from "drizzle-orm";
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

export const userPreferencesTable = p.pgTable("user_preferences", {
  userId: p.uuid("user_id").primaryKey().defaultRandom(),
  emailUpdates: p.boolean("email_updates").notNull().default(false),
  userRefId: p
    .uuid("user_ref_id")
    .references(() => userTable.userId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
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
    .references(() => userTable.userId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
});

export const categoriesTable = p.pgTable("categories", {
  categoryId: p.uuid("category_id").primaryKey().defaultRandom(),
  categoryName: p.varchar("category_name", { length: 255 }).notNull(),
});

export const postCategoryTable = p.pgTable(
  "post_categories",
  {
    postId: p
      .uuid("post_id")
      .notNull()
      .references(() => postTable.postId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    categoryId: p
      .uuid("category_id")
      .notNull()
      .references(() => categoriesTable.categoryId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => [p.primaryKey({ columns: [table.postId, table.categoryId] })]
);

export const reviewTable = p.pgTable("reviews", {
  reviewId: p.uuid("review_id").primaryKey().defaultRandom(),
  rating: p.integer("rating").notNull(),
  feedback: p.text("feedback"),
  userId: p
    .uuid("user_id")
    .notNull()
    .references(() => userTable.userId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  postId: p
    .uuid("post_id")
    .notNull()
    .references(() => postTable.postId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const likesTable = p.pgTable("likes", {
  likeId: p.uuid("like_id").primaryKey().defaultRandom(),
  userId: p
    .uuid("user_id")
    .notNull()
    .references(() => userTable.userId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  postId: p
    .uuid("post_id")
    .notNull()
    .references(() => postTable.postId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

//DRIZZLE-LEVEL RELATIONSHIP MAPPING

export const userTableRelations = relations(userTable, ({ one, many }) => ({
  preferences: one(userPreferencesTable, {
    fields: [userTable.userId],
    references: [userPreferencesTable.userRefId],
  }),
  posts: many(postTable),
}));

export const userPreferencesRelations = relations(
  userPreferencesTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [userPreferencesTable.userRefId],
      references: [userTable.userId],
    }),
  })
);

export const postTableRelations = relations(postTable, ({ one, many }) => ({
  author: one(userTable, {
    fields: [postTable.authorId],
    references: [userTable.userId],
  }),
  postCategories: many(postCategoryTable),
}));

export const categoriesTableRelations = relations(
  categoriesTable,
  ({ many }) => ({
    postCategories: many(postCategoryTable),
  })
);

export const postCategoryTableRelations = relations(
  postCategoryTable,
  ({ one }) => ({
    post: one(postTable, {
      fields: [postCategoryTable.postId],
      references: [postTable.postId],
    }),
    category: one(categoriesTable, {
      fields: [postCategoryTable.categoryId],
      references: [categoriesTable.categoryId],
    }),
  })
);

export const reviewRelations = relations(reviewTable, ({ one }) => ({
  post: one(postTable, {
    fields: [reviewTable.postId],
    references: [postTable.postId],
  }),
  user: one(userTable, {
    fields: [reviewTable.userId],
    references: [userTable.userId],
  }),
}));

export const likeRelations = relations(likesTable, ({ one }) => ({
  post: one(postTable, {
    fields: [likesTable.postId],
    references: [postTable.postId],
  }),
  user: one(userTable, {
    fields: [likesTable.userId],
    references: [userTable.userId],
  }),
}));
