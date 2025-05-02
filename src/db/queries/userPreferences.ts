import { db } from "../index";
import { userPreferencesTable } from "../schema";
import { eq } from "drizzle-orm";

export const addUserPreferences = async (
  userRefId: string,
  emailUpdates: boolean = false
) => {
  try {
    return await db.insert(userPreferencesTable).values({
      userRefId,
      emailUpdates,
    });
  } catch (error) {
    console.error("Error adding user preferences:", error);
    throw error;
  }
};

export const updateUserPreferences = async (
  userRefId: string,
  emailUpdates: boolean
) => {
  try {
    return await db
      .update(userPreferencesTable)
      .set({ emailUpdates })
      .where(eq(userPreferencesTable.userRefId, userRefId));
  } catch (error) {
    console.error("Error updating user preferences:", error);
    throw error;
  }
};

export const deleteUserPreferences = async (userRefId: string) => {
  try {
    return await db
      .delete(userPreferencesTable)
      .where(eq(userPreferencesTable.userRefId, userRefId));
  } catch (error) {
    console.error("Error deleting user preferences:", error);
    throw error;
  }
};

export const getAllUserPreferences = async () => {
  try {
    return await db.select().from(userPreferencesTable);
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    throw error;
  }
};
