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

  await db.insert(userTable).values({
    firstName: "Percy",
    lastName: "Mole",
    age: 21,
    email: "molepercy@zimzom.com",
    phoneNumber: "+91 9324993243",
    gender: "female",
  });

  const user = await db.query.userTable.findFirst();
  console.log(user);

  const result = await db.select().from(userTable);
  console.log("The user data is : ", result);
}
main();

/*
Query: select "user_id", "first_name", "last_name", "age", "email", "phone_number", "gender" from "user" "userTable" limit $1 -- params: [1]    
{
  userId: '4f8947bf-ef4b-4f09-9f11-9fe42680eea3',
  firstName: 'Rumi',
  lastName: 'Ziquel',
  age: 22,
  email: 'rumiz@ex.com',
  phoneNumber: '+91 7438974384',
  gender: 'female'
}'''
*/

/*
Query: select "user_id", "first_name", "last_name", "age", "email", "phone_number", "gender" from "user"
The user data is :  [
  {
    userId: '4f8947bf-ef4b-4f09-9f11-9fe42680eea3',
    firstName: 'Rumi',
    lastName: 'Ziquel',
    age: 22,
    email: 'rumiz@ex.com',
    phoneNumber: '+91 7438974384',
    gender: 'female'
  },
  {
    userId: 'ada660c1-814b-415c-a1cb-7cb64e0d32e4',
    firstName: 'Percy',
    lastName: 'Mole',
    age: 21,
    email: 'molepercy@zimzom.com',
    phoneNumber: '+91 9324993243',
    gender: 'female'
  }
]
*/
