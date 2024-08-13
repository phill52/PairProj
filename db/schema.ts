import {
	boolean,
	timestamp,
	pgTable,
	text,
	numeric,
	integer,
	uuid,
} from "drizzle-orm/pg-core";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
const connectionString: string = process.env.DATABASE_URL as string;
let sslmode = "";
if (process.env.APP_ENV === "prod") {
	sslmode = "?sslmode=require";
}
const pool = postgres(connectionString + sslmode, { max: 1 });
export const db = drizzle(pool, { logger: true });

export const profile = pgTable("profile", {
	id: uuid("id"),
	created_at: timestamp("created_at", {mode: "date"}),
	first_name: text("first_name"),
	last_name: text("last_name"),
	bio: text("bio"),
	skill_level: text("skill_level"),
	avatar_location: text("avatar_location"),
	resume_location: text("resume_location"),
	email: text("email")
})

export const profile_education = pgTable("profile_education", {
	id: uuid("id"),
	created_at: timestamp("created_at", {mode: "date"}),
	profile_id: uuid("profile_id"),
	school_name: text("school_name"),
	major: text("major"),
	start_year: integer("start_year"),
	end_year: integer("end_year"),
	gpa: numeric("gpa")
})

export const profile_work_experience = pgTable("profile_work_experience", {
	id: uuid("id"),
	created_at: timestamp("created_at", {mode: "date"}),
	profile_id: uuid("profile_id"),
	company_name: text("company_name"),
	job_title: text("job_title"),
	job_description: text("job_description"),
	start_year: integer("start_year"),
	end_year: integer("end_year")
})

export const chat_room = pgTable("chat_room", {
	id: uuid("id"),
	created_at: timestamp("created_at", {mode: "date"}),
	owner_profile_id: uuid("owner_profile_id"),
	name: text("name")
})

export const chat_member = pgTable("chat_member", {
	id: uuid("id"),
	created_at: timestamp("created_at", {mode: "date"}),
	profile_id: uuid("profile_id"),
	chat_room_id: uuid("chat_room_id"),
	unread_messages: integer("unread_messages")
})

export const chat_message = pgTable("chat_message", {
	id: uuid("id"),
	created_at: timestamp("created_at", {mode: "date"}),
	sender_profile_id: uuid("sender_profile_id"),
	chat_room_id: uuid("chat_room_id"),
	message_content: text("message_content")
})

export const project = pgTable("project", {
	id: uuid("id"),
	created_at: timestamp("created_at", {mode: "date"}),
	name: text("name"),
	description: text("description"),
	owner_profile_id: uuid("owner_profile_id"),
	skill_level: text("skill_level"),
	github_repository: text("github_repository"),
	is_locked: boolean("is_locked")
})

export const role = pgTable("role", {
	id: uuid("id"),
	name: text("name")
})

export const profile_role_relationship = pgTable("profile_role_relationship", {
	id: uuid("id"),
	profile_id: uuid("profile_id"),
	role_id: uuid("role_id")
})

export const project_role_relationship = pgTable("project_role_relationship", {
	id: uuid("id"),
	project_id: uuid("project_id"),
	role_id: uuid("role_id")
})

export const skill = pgTable("skill", {
	id: uuid("id"),
	name: text("name"),
	icon_location: text("icon_location")
})

export const profile_skill_relationship = pgTable("profile_skill_relationship", {
	id: uuid("id"),
	profile_id: uuid("profile_id"),
	skill_id: uuid("skill_id")
})

export const project_skill_relationship = pgTable("project_skill_relationship", {
	id: uuid("id"),
	project_id: uuid("project_id"),
	skill_id: uuid("skill_id"),
	is_required: boolean("is_required")
})

export const project_application = pgTable("project_application", {
	id: uuid("id"),
	created_at: timestamp("created_at", {mode: "date"}),
	project_id: uuid("project_id"),
	applicant_profile_id: uuid("applicant_profile_id"),
	role_id: uuid("role_id"),
	message: text("message"),
	is_denied: boolean("is_denied")
})

export const project_invite = pgTable("project_invite", {
	id: uuid("id"),
	created_at: timestamp("created_at", {mode: "date"}),
	project_id: uuid("project_id"),
	profile_id: uuid("profile_id"),
	role_id: uuid("role_id"),
	message: text("message"),
	is_denied: boolean("is_denied")
})

export const project_collaborator = pgTable("project_collaborator", {
	id: uuid("id"),
	created_at: timestamp("created_at", {mode: "date"}),
	project_id: uuid("project_id"),
	profile_id: uuid("profile_id"),
	role_id: uuid("role_id"),
})

export const project_news = pgTable("project_news", {
	id: uuid("id"),
	created_at: timestamp("created_at", {mode: "date"}),
	project_id: uuid("project_id"),
	message: text("message")
})

export const saved_project = pgTable("saved_project", {
	id: uuid("id"),
	project_id: uuid("project_id"),
	profile_id: uuid("profile_id")
})