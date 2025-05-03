import { addUser } from "../db/db_services/user";

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@silly.com",
    phoneNumber: "1+91 234567890",
    gender: "male",
    role: "ADMIN",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    age: 25,
    email: "jane.smith@eme.com",
    phoneNumber: "+91 2345678901",
    gender: "female",
    role: "USER",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    age: 28,
    email: "alicejohnson@example.com",
    phoneNumber: "+91 9439873444",
    gender: "female",
    role: "USER",
  },
  {
    firstName: "Bob",
    lastName: "Brown",
    age: 35,
    email: "bobbrown@suepr.com",
    phoneNumber: "+91 9567890123",
    gender: "male",
    role: "USER",
  },
  {
    firstName: "Charlie",
    lastName: "Davis",
    age: 40,
    email: "charliedavis@example.com",
    phoneNumber: "+19 9678901234",
    gender: "male",
    role: "USER",
  },
  {
    firstName: "David",
    lastName: "Martinez",
    age: 45,
    email: "davidmartinez@example.com",
    phoneNumber: "+91 6789012345",
    gender: "male",
    role: "USER",
  },
  {
    firstName: "Eve",
    lastName: "Miller",
    age: 22,
    email: "evemiller@copy.com",
    phoneNumber: "+91 7890123456",
    gender: "female",
    role: "USER",
  },
  {
    firstName: "Frank",
    lastName: "Wilson",
    age: 50,
    email: "frankwilson@googy.com",
    phoneNumber: "+91 8901234567",
    gender: "male",
    role: "USER",
  },
  {
    firstName: "Grace",
    lastName: "Moore",
    age: 32,
    email: "grace.moore@ooty.com",
    phoneNumber: "9012345678",
    gender: "female",
    role: "USER",
  },
  {
    firstName: "Hannah",
    lastName: "Taylor",
    age: 29,
    email: "hannah.taylor@mirra.com",
    phoneNumber: "+91 9123456789",
    gender: "female",
    role: "ADMIN",
  },
] as const;

const insertUsers = async () => {
  try {
    for (const user of users) {
      const userId = await addUser(user);
      console.log(`User added with userId: ${userId}`);
    }
  } catch (error) {
    console.error("Error inserting users:", error);
  }
};

insertUsers();
