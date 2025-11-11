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

let sslConfig = "";
if (process.env.APP_ENV === "prod") {
	sslConfig = "?ssl=true";
}
export default defineConfig({
	schema: "./db/schema.ts",
	dialect: "mysql",
	out: "./drizzle",
	dbCredentials: {
		url: connectionString + sslConfig,
	},
	verbose: true,
	strict: true,
});
//taken from https://github.com/fullstackbook/next-auth-drizzle-postgres-tutorial
