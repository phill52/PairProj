import {
	boolean,
	timestamp,
	pgTable,
	text,
	numeric,
	integer,
	uuid,
	date,
	primaryKey,
} from "drizzle-orm/pg-core";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { relations } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";

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

export const userRelations = relations(users, ({ many }) => ({
	project: many(project),
}));

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

export const profile_education = pgTable("profile_education", {
	id: uuid("id"),
	created_at: timestamp("created_at", { mode: "date" }),
	profile_id: uuid("profile_id"),
	school_name: text("school_name"),
	major: text("major"),
	start_year: integer("start_year"),
	end_year: integer("end_year"),
	gpa: numeric("gpa"),
});

export const profile_work_experience = pgTable("profile_work_experience", {
	id: uuid("id"),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	profile_id: uuid("profile_id"),
	company_name: text("company_name"),
	job_title: text("job_title"),
	job_description: text("job_description"),
	start_year: integer("start_year"),
	end_year: integer("end_year"),
});

export const chat_room = pgTable("chat_room", {
	id: uuid("id"),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	owner_profile_id: uuid("owner_profile_id"),
	name: text("name"),
});

export const chat_member = pgTable("chat_member", {
	id: uuid("id"),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	profile_id: uuid("profile_id"),
	chat_room_id: uuid("chat_room_id"),
	unread_messages: integer("unread_messages"),
});

export const chat_message = pgTable("chat_message", {
	id: uuid("id").notNull(),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	sender_profile_id: uuid("sender_profile_id"),
	chat_room_id: uuid("chat_room_id"),
	message_content: text("message_content"),
});

export const project = pgTable("project", {
	id: uuid("id").notNull(),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	name: text("name"),
	description: text("description"),
	owner_profile_id: uuid("owner_profile_id"),
	skill_level: text("skill_level"),
	github_repository: text("github_repository"),
	is_locked: boolean("is_locked"),
});

export const projectRelations = relations(project, ({ one }) => ({
	owner_profile: one(users, {
		fields: [project.owner_profile_id],
		references: [users.id],
	}),
}));

export const role = pgTable("role", {
	id: uuid("id"),
	name: text("name"),
});

export const profile_role_relationship = pgTable("profile_role_relationship", {
	id: uuid("id"),
	profile_id: uuid("profile_id"),
	role_id: uuid("role_id"),
});

export const skill = pgTable("skill", {
	id: uuid("id"),
	name: text("name"),
	icon_location: text("icon_location"),
});

export const profile_skill_relationship = pgTable(
	"profile_skill_relationship",
	{
		id: uuid("id"),
		profile_id: uuid("profile_id"),
		skill_id: uuid("skill_id"),
	},
);

export const project_skill_relationship = pgTable(
	"project_skill_relationship",
	{
		id: uuid("id"),
		project_id: uuid("project_id"),
		skill_id: uuid("skill_id"),
		is_required: boolean("is_required"),
	},
);

export const project_application = pgTable("project_application", {
	id: uuid("id"),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	project_id: uuid("project_id"),
	applicant_profile_id: uuid("applicant_profile_id"),
	role_id: uuid("role_id"),
	message: text("message"),
	is_denied: boolean("is_denied"),
});

export const project_invite = pgTable("project_invite", {
	id: uuid("id"),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	project_id: uuid("project_id"),
	profile_id: uuid("profile_id"),
	role_id: uuid("role_id"),
	message: text("message"),
	is_denied: boolean("is_denied"),
});

export const project_collaborator = pgTable("project_collaborator", {
	id: uuid("id"),
	created_at: timestamp("created_at", { mode: "date" }),
	project_id: uuid("project_id"),
	profile_id: uuid("profile_id"),
	role_id: uuid("role_id"),
});

export const project_news = pgTable("project_news", {
	id: uuid("id"),
	created_at: timestamp("created_at", { mode: "date" }),
	project_id: uuid("project_id"),
	message: text("message"),
});

export const saved_project = pgTable("saved_project", {
	id: uuid("id"),
	project_id: uuid("project_id"),
	profile_id: uuid("profile_id"),
});
