import {
	boolean,
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
const connectionString: string = process.env.DATABASE_URL as string;
let sslmode = "";
if (process.env.APP_ENV === "prod") {
	sslmode = "?sslmode=require";
}
const pool = postgres(connectionString + sslmode, { max: 1 });
export const db = drizzle(pool, { logger: true });

export const users = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	user_name: text("user_name"),
	first_name: text("first_name"),
	last_name: text("last_name"),
	email: text("email"),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
	bio: text("bio"),
	skill_level: integer("skill_level"),
	avatar_location: text("avatar_location"),
	resume_location: text("resume_location"),
	created_at: timestamp("created_at", { mode: "date" })
		.notNull()
		.defaultNow(),
});

// export const account = pgTable("user", {
// 	id: uuid("id").primaryKey().defaultRandom(),
// 	user_name: text("user_name").unique(),
// 	first_name: text("first_name"),
// 	last_name: text("last_name"),
// 	email: text("email").unique(),
// 	password: text("password"),
// 	email_verified: timestamp("email_verified", { mode: "date" }),
// 	image: text("image"),
// 	bio: text("bio"),
// 	skill_level: integer("skill_level"),
// 	avatar_location: text("avatar_location"),
// 	resume_location: text("resume_location"),
// 	created_at: timestamp("created_at", { mode: "date" }),
// });

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	}),
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.identifier, verificationToken.token],
		}),
	}),
);

export const authenticators = pgTable(
	"authenticator",
	{
		credentialID: text("credentialID").notNull().unique(),
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		providerAccountId: text("providerAccountId").notNull(),
		credentialPublicKey: text("credentialPublicKey").notNull(),
		counter: integer("counter").notNull(),
		credentialDeviceType: text("credentialDeviceType").notNull(),
		credentialBackedUp: boolean("credentialBackedUp").notNull(),
		transports: text("transports"),
	},
	(authenticator) => ({
		compositePK: primaryKey({
			columns: [authenticator.userId, authenticator.credentialID],
		}),
	}),
);
//taken from https://authjs.dev/getting-started/adapters/drizzle
