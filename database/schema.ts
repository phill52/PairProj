import {
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const users = pgTable("user", {
	id: uuid("id").primaryKey().defaultRandom(),
	user_name: text("user_name").unique(),
	first_name: text("first_name"),
	last_name: text("last_name"),
	email: text("email").unique(),
	password: text("password"),
	email_verified: timestamp("email_verified", { mode: "date" }),
	image: text("image"),
	bio: text("bio"),
	skill_level: integer("skill_level"),
	avatar_location: text("avatar_location"),
	resume_location: text("resume_location"),
	created_at: timestamp("created_at", { mode: "date" }),
});
