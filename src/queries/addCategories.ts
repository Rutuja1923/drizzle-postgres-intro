import { addCategory } from "../db/db_services/categories";

const categoryNames = [
  "programming",
  "devops",
  "databases",
  "webdev",
  "testing",
  "security",
];

const seedCategories = async () => {
  try {
    for (const name of categoryNames) {
      await addCategory(name);
    }
  } catch (error) {
    console.error("Error inserting categories:", error);
    throw error;
  }
};

seedCategories();
