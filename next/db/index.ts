import { sql } from "drizzle-orm";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { relations } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";
import dotenv from "dotenv";
import * as schema from "./schema";

dotenv.config({
	path: ".env",
});
const connectionString: string = process.env.DATABASE_URL as string;
if (!connectionString) {
	throw new Error("DATABASE_URL is not defined");
}

let sslmode = "";
if (process.env.APP_ENV === "prod") {
	sslmode = "?sslmode=require";
}
const pool = postgres(connectionString + sslmode, { max: 1 });

export const db = drizzle(pool, { schema });
