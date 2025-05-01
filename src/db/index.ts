import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { DATABASE_URL } from "./dbUrl";

const db = drizzle(DATABASE_URL!);
const result = await db.execute("select 1");
