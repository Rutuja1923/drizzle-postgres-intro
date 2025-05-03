import { deleteUser } from "../db/db_services/user";

const main = async () => {
  const res = await deleteUser("488a466a-4c93-4ed9-bcca-9e98cc02843f");
  console.log(res);
};

main();

//run the module test from db/db_services by uncommenting the code