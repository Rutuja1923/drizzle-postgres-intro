import "dotenv/config";
import { db } from "./src/db";
import { userTable } from "./src/db/schema";
async function main() {
//   await db.insert(userTable).values({
//     firstName: "Rumi",
//     lastName: "Ziquel",
//     age: 22,
//     email: "rumiz@ex.com",
//     phoneNumber: "+91 7438974384",
//     gender: "female",
//   });

//   await db.insert(userTable).values({
//     firstName: "Percy",
//     lastName: "Mole",
//     age: 21,
//     email: "molepercy@zimzom.com",
//     phoneNumber: "+91 9324993243",
//     gender: "female",
//   });

//   await db.insert(userTable).values({
//     firstName: "Mike",
//     lastName: "Hikes",
//     age: 22,
//     email: "hikeme@dev.com",
//     phoneNumber: "+91 9867986796",
//     gender: "male",
//     role: "ADMIN"
//   });

  const user = await db.query.userTable.findFirst();
  console.log(user);

  const result = await db.select().from(userTable);
  console.log("The user data is : ", result);
}
main();

