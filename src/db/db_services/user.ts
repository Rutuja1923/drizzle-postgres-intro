import { userTable } from "../schema";
import { db } from "../index";
import { eq } from "drizzle-orm";

export type Gender = "male" | "female" | "other";
export type Role = "ADMIN" | "USER";

export const addUser = async (user: {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phoneNumber: string;
  gender: Gender;
  role: Role;
}) => {
  try {
    const result = await db
      .insert(userTable)
      .values(user)
      .returning({ userId: userTable.userId });

    if (result.length > 0) {
      console.log("User added with userId:", result[0].userId);
      return result[0].userId;
    } else {
      throw new Error("Insert returned no data.");
    }
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    return await db.select().from(userTable);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    return await db.delete(userTable).where(eq(userTable.userId, userId));
  } catch (error) {
    console.error(`Failed to delete user with ID ${userId}:`, error);
    throw error;
  }
};
