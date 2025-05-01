import "dotenv/config";
import { db } from "./src/db";
import { userTable } from "./src/db/schema";
async function main() {
  await db.insert(userTable).values({
    firstName: "Rumi",
    lastName: "Ziquel",
    age: 22,
    email: "rumiz@ex.com",
    phoneNumber: "+91 7438974384",
    gender: "female",
  });

  const user = await db.query.userTable.findFirst();
  console.log(user);
}
main();
