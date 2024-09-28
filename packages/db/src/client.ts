import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}


const queryClient = postgres(process.env.DATABASE_URL);

export const db = drizzle(queryClient, { schema });
