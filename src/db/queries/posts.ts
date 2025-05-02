import { db } from "../index";
import { postTable } from "../schema";
import { eq } from "drizzle-orm";

export const addPost = async (title: string, authorId: string) => {
  try {
    return await db.insert(postTable).values({ title, authorId });
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

export const updatePostTitle = async (postId: string, newTitle: string) => {
  try {
    return await db
      .update(postTable)
      .set({ title: newTitle, updatedAt: new Date() })
      .where(eq(postTable.postId, postId));
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (postId: string) => {
  try {
    return await db.delete(postTable).where(eq(postTable.postId, postId));
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    return await db.select().from(postTable);
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
