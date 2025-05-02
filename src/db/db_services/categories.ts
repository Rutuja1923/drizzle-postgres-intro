import { db } from "../index";
import { categoriesTable } from "../schema";
import { eq } from "drizzle-orm";

export const addCategory = async (categoryName: string) => {
  try {
    return await db
      .insert(categoriesTable)
      .values({ categotyName: categoryName });
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    return await db.select().from(categoriesTable);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const updateCategory = async (categoryId: string, newName: string) => {
  try {
    return await db
      .update(categoriesTable)
      .set({ categotyName: newName })
      .where(eq(categoriesTable.categoryId, categoryId));
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    return await db
      .delete(categoriesTable)
      .where(eq(categoriesTable.categoryId, categoryId));
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
