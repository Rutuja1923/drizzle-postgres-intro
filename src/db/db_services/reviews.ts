import { reviewTable, postTable } from "../schema";
import { db } from "../index";
import { eq, sql } from "drizzle-orm";

export const addReview = async (
  rating: number,
  postId: string,
  userId: string,
  feedback?: string
) => {
  try {
    await db.insert(reviewTable).values({ rating, postId, userId, feedback });

    //re-calculate the average rating of this post
    const result = await db
      .select({ avg: sql<number>`AVG(${reviewTable.rating})` })
      .from(reviewTable)
      .where(eq(reviewTable.postId, postId));

    const avgRating = result[0]?.avg ?? 0;

    //update the new average rating in post-table
    await db
      .update(postTable)
      .set({ averageRating: avgRating })
      .where(eq(postTable.postId, postId));
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const updateReviewRating = async (
  reviewId: string,
  newRating: number
) => {
  try {
    //update rating
    const review = await db
      .update(reviewTable)
      .set({ rating: newRating })
      .where(eq(reviewTable.reviewId, reviewId));

    //get the post-id
    const updatedReview = await db
      .select({ postId: reviewTable.postId })
      .from(reviewTable)
      .where(eq(reviewTable.reviewId, reviewId));

    const postId = updatedReview[0]?.postId;

    //recalculate the average-rating
    if (postId) {
      const result = await db
        .select({ avg: sql<number>`AVG(${reviewTable.rating})` })
        .from(reviewTable)
        .where(eq(reviewTable.postId, postId));

      const avgRating = result[0]?.avg ?? 0;

      //update the new average-rating in posts table
      await db
        .update(postTable)
        .set({ averageRating: avgRating })
        .where(eq(postTable.postId, postId));
    }

    return review;
  } catch (error) {
    console.error("Error updating review rating:", error);
    throw error;
  }
};

export const updateReviewMessage = async (
  reviewId: string,
  newMessage: string
) => {
  try {
    return await db
      .update(reviewTable)
      .set({ feedback: newMessage })
      .where(eq(reviewTable.reviewId, reviewId));
  } catch (error) {
    console.error("Error updating review message:", error);
    throw error;
  }
};

export const deleteReview = async (reviewId: string) => {
  try {
    //find the postId before deleting
    const review = await db
      .select({ postId: reviewTable.postId })
      .from(reviewTable)
      .where(eq(reviewTable.reviewId, reviewId));

    const postId = review[0]?.postId;

    //delete review
    const deleted = await db
      .delete(reviewTable)
      .where(eq(reviewTable.reviewId, reviewId));

    //recalculate average rating
    if (postId) {
      const result = await db
        .select({ avg: sql<number>`AVG(${reviewTable.rating})` })
        .from(reviewTable)
        .where(eq(reviewTable.postId, postId));

      const avgRating = result[0]?.avg ?? 0;

      //update average rating
      await db
        .update(postTable)
        .set({ averageRating: avgRating })
        .where(eq(postTable.postId, postId));
    }

    return deleted;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};
