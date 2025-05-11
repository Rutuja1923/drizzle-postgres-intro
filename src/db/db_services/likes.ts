import { db } from "../index";
import { likesTable } from "../schema";
import { eq, and } from "drizzle-orm";

//check if user has liked a post
export const hasLiked = async (userId: string, postId: string) => {
  const result = await db
    .select()
    .from(likesTable)
    .where(and(eq(likesTable.userId, userId), eq(likesTable.postId, postId)));
  return result.length > 0;
};

//add Like
export const addLike = async (userId: string, postId: string) => {
  const alreadyLiked = await hasLiked(userId, postId);
  if (!alreadyLiked) {
    return await db.insert(likesTable).values({ userId, postId });
  }
  return null;
};

//remove Like
export const removeLike = async (userId: string, postId: string) => {
  return await db
    .delete(likesTable)
    .where(and(eq(likesTable.userId, userId), eq(likesTable.postId, postId)));
};

//toggle Like
export const toggleLike = async (userId: string, postId: string) => {
  const alreadyLiked = await hasLiked(userId, postId);
  if (alreadyLiked) {
    await removeLike(userId, postId);
    return { liked: false };
  } else {
    await addLike(userId, postId);
    return { liked: true };
  }
};
