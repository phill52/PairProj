import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

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
export default defineConfig({
	schema: "./db/schema.ts",
	dialect: "postgresql",
	out: "./drizzle",
	dbCredentials: {
		url: connectionString + sslmode,
	},
	verbose: true,
	strict: true,
});
//taken from https://github.com/fullstackbook/next-auth-drizzle-postgres-tutorial
