// import { sql } from "drizzle-orm";
// import mysql from "mysql2/promise";
// import { drizzle } from "drizzle-orm/mysql2";
// import { relations } from "drizzle-orm";
// import type { AdapterAccountType } from "next-auth/adapters";
// import dotenv from "dotenv";
// import * as schema from "./schema";

// dotenv.config({
// 	path: ".env",
// });
// const connectionString: string = process.env.DATABASE_URL as string;
// if (!connectionString) {
// 	throw new Error("DATABASE_URL is not defined");
// }

// let sslConfig = "";
// if (process.env.APP_ENV === "prod") {
// 	sslConfig = "?ssl=true";
// }

// const poolConnection = mysql.createPool(connectionString + sslConfig);

// export const db = drizzle(poolConnection, { schema, mode: "default" });
