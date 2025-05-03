import { getAllUsers } from "../db/db_services/user";

const main = async () => {
  try {
    const users = await getAllUsers();
    console.log("Users fetched:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

main();
