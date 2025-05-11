import { deleteUser } from "../db/db_services/user";

//add the user id that you wish to delete
let uId = "488a466a-4c93-4ed9-bcca-9e98cc02843f"; 

const main = async () => {
  const res = await deleteUser(uId);
  console.log(res);
};

main();

//run the module test from db/db_services by uncommenting the code