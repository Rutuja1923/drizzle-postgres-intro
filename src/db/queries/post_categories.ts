import { db } from "../index";
import { postCategoryTable } from "../schema";
import { and, eq } from "drizzle-orm";

export const addPostCategory = async (postId: string, categoryId: string) => {
  try {
    return await db.insert(postCategoryTable).values({ postId, categoryId });
  } catch (error) {
    console.error("Error linking post and category:", error);
    throw error;
  }
};

export const deletePostCategory = async (
  postId: string,
  categoryId: string
) => {
  try {
    return await db
      .delete(postCategoryTable)
      .where(
        and(
          eq(postCategoryTable.postId, postId),
          eq(postCategoryTable.categoryId, categoryId)
        )
      );
  } catch (error) {
    console.error("Error unlinking post and category:", error);
    throw error;
  }
};

export const getAllPostCategories = async () => {
  try {
    return await db.select().from(postCategoryTable);
  } catch (error) {
    console.error("Error fetching post-category mappings:", error);
    throw error;
  }
};
