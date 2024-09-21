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
import { int } from "drizzle-orm/mysql-core";

const connectionString: string = process.env.DATABASE_URL as string;
let sslmode = "";
if (process.env.APP_ENV === "prod") {
	sslmode = "?sslmode=require";
}
const pool = postgres(connectionString + sslmode, { max: 1 });
export const db = drizzle(pool, { logger: true });

//TODO: change ids off of UUID for efficiency

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

export const usersRelations = relations(users, ({ many, one }) => ({
	accounts: many(accounts, { relationName: "userAccounts" }),
	sessions: many(sessions, { relationName: "userSessions" }),
	ownedProjects: many(project, { relationName: "projectOwner" }),
	roles: many(profile_role_relationship, { relationName: "userRoles" }),
	skills: many(profile_skill_relationship, { relationName: "userSkills" }),
	educations: many(profile_education, { relationName: "userEducations" }),
	workExperiences: many(profile_work_experience, {
		relationName: "userWorkExperiences",
	}),
	ownedChatRooms: many(chat_room, { relationName: "chatRoomOwner" }),
	chatMemberships: many(chat_member, { relationName: "userChatMemberships" }),
	chatMessages: many(chat_message, { relationName: "userChatMessages" }),
	projectApplications: many(project_application, {
		relationName: "userAppliedProjects",
	}),
	projectInvites: many(project_invite, {
		relationName: "userProjectInvites",
	}),
	savedProjects: many(saved_project, { relationName: "userSavedProjects" }),
}));

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

export const profile_education = pgTable("profile_education", {
	id: uuid("id").notNull().defaultRandom().primaryKey(),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	profile_id: text("profile_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	school_name: text("school_name"),
	major: text("major"),
	start_year: integer("start_year"),
	end_year: integer("end_year"),
	gpa: numeric("gpa"),
});

export const profile_work_experience = pgTable("profile_work_experience", {
	id: uuid("id").notNull().defaultRandom().primaryKey(),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	profile_id: text("profile_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	company_name: text("company_name"),
	job_title: text("job_title"),
	job_description: text("job_description"),
	start_year: integer("start_year"),
	end_year: integer("end_year"),
});

export const profileEducationRelations = relations(
	profile_education,
	({ one }) => ({
		user: one(users, {
			fields: [profile_education.profile_id],
			references: [users.id],
		}),
	}),
);

export const profileWorkExperienceRelations = relations(
	profile_work_experience,
	({ one }) => ({
		user: one(users, {
			fields: [profile_work_experience.profile_id],
			references: [users.id],
		}),
	}),
);

//leaving chat tables alone for now, might offload this to a vendor(?) later
export const chat_room = pgTable("chat_room", {
	id: uuid("id"),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	owner_profile_id: text("owner_profile_id"),
	name: text("name"),
});

export const chat_member = pgTable("chat_member", {
	id: uuid("id"),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	profile_id: text("profile_id"),
	chat_room_id: uuid("chat_room_id"),
	unread_messages: integer("unread_messages"),
});

export const chat_message = pgTable("chat_message", {
	id: uuid("id").notNull(),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	sender_profile_id: text("sender_profile_id"),
	chat_room_id: uuid("chat_room_id"),
	message_content: text("message_content"),
});

export const chatRoomRelations = relations(chat_room, ({ one, many }) => ({
	owner: one(users, {
		fields: [chat_room.owner_profile_id],
		references: [users.id],
	}),
	members: many(chat_member),
	messages: many(chat_message),
}));

export const chatMemberRelations = relations(chat_member, ({ one }) => ({
	user: one(users, {
		fields: [chat_member.profile_id],
		references: [users.id],
	}),
	chatRoom: one(chat_room, {
		fields: [chat_member.chat_room_id],
		references: [chat_room.id],
	}),
}));

export const chatMessageRelations = relations(chat_message, ({ one }) => ({
	sender: one(users, {
		fields: [chat_message.sender_profile_id],
		references: [users.id],
	}),
	chatRoom: one(chat_room, {
		fields: [chat_message.chat_room_id],
		references: [chat_room.id],
	}),
}));

export const project = pgTable("project", {
	id: uuid("id").notNull().defaultRandom().primaryKey(),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	name: text("name"),
	description: text("description"),
	owner_profile_id: text("owner_profile_id")
		.references(() => users.id, { onDelete: "set null" })
		.notNull(),
	skill_level: text("skill_level"),
	github_repository: text("github_repository"),
	is_locked: boolean("is_locked"),
});

export const project_member = pgTable("project_member", {
	id: uuid("id").notNull().defaultRandom().primaryKey(),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	project_id: uuid("project_id")
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	profile_id: text("profile_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	project_role: integer("project_role"), //this will be an enum to represent the role
});

export const projectRelations = relations(project, ({ one, many }) => ({
	owner: one(users, {
		fields: [project.owner_profile_id],
		references: [users.id],
		relationName: "projectOwner",
	}),
	members: many(project_member),
	skills: many(project_skill_relationship),
	applications: many(project_application),
	invites: many(project_invite),
	news: many(project_news),
	savedBy: many(saved_project),
}));

export const projectMemberRelations = relations(project_member, ({ one }) => ({
	project: one(project, {
		fields: [project_member.project_id],
		references: [project.id],
	}),
	user: one(users, {
		fields: [project_member.profile_id],
		references: [users.id],
	}),
}));

export const role = pgTable("role", {
	id: uuid("id").notNull().defaultRandom().primaryKey(),
	name: text("name"),
});

export const profile_role_relationship = pgTable("profile_role_relationship", {
	id: uuid("id"),
	profile_id: text("profile_id")
		.notNull()
		.references(() => users.id, {
			onDelete: "cascade",
		}),
	role_id: uuid("role_id")
		.notNull()
		.references(() => role.id, {
			onDelete: "cascade",
		}),
});

export const skill = pgTable("skill", {
	id: uuid("id").primaryKey(),
	name: text("name"),
	icon_location: text("icon_location"),
});

export const profile_skill_relationship = pgTable(
	"profile_skill_relationship",
	{
		profile_id: text("profile_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		skill_id: uuid("skill_id")
			.notNull()
			.references(() => skill.id, { onDelete: "cascade" }),
	},
);

export const project_skill_relationship = pgTable(
	"project_skill_relationship",
	{
		id: uuid("id").notNull().defaultRandom().primaryKey(),
		project_id: uuid("project_id")
			.notNull()
			.references(() => project.id, { onDelete: "cascade" }),
		skill_id: uuid("skill_id")
			.notNull()
			.references(() => skill.id, { onDelete: "cascade" }),
		is_required: boolean("is_required"),
	},
);

export const skillRelations = relations(skill, ({ many }) => ({
	userRelationships: many(profile_skill_relationship),
	projectRelationships: many(project_skill_relationship),
}));

export const profileSkillRelationshipRelations = relations(
	profile_skill_relationship,
	({ one }) => ({
		user: one(users, {
			fields: [profile_skill_relationship.profile_id],
			references: [users.id],
		}),
		skill: one(skill, {
			fields: [profile_skill_relationship.skill_id],
			references: [skill.id],
		}),
	}),
);

export const projectSkillRelationshipRelations = relations(
	project_skill_relationship,
	({ one }) => ({
		project: one(project, {
			fields: [project_skill_relationship.project_id],
			references: [project.id],
		}),
		skill: one(skill, {
			fields: [project_skill_relationship.skill_id],
			references: [skill.id],
		}),
	}),
);

export const project_application = pgTable("project_application", {
	id: uuid("id").notNull().defaultRandom().primaryKey(),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	project_id: uuid("project_id")
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	applicant_profile_id: text("applicant_profile_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	role_id: uuid("role_id"),
	message: text("message"),
	is_denied: boolean("is_denied"),
});

export const project_invite = pgTable("project_invite", {
	id: uuid("id").notNull().defaultRandom().primaryKey(),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	project_id: uuid("project_id")
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	profile_id: text("profile_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	role_id: uuid("role_id"),
	message: text("message"),
	is_denied: boolean("is_denied"),
});

export const project_collaborator = pgTable("project_collaborator", {
	id: uuid("id"),
	created_at: timestamp("created_at", { mode: "date" }),
	project_id: uuid("project_id"),
	profile_id: text("profile_id"),
	role_id: uuid("role_id"),
});

export const project_news = pgTable("project_news", {
	id: uuid("id").notNull().defaultRandom().primaryKey(),
	created_at: timestamp("created_at", { mode: "date" })
		.notNull()
		.defaultNow(),
	project_id: uuid("project_id")
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	message: text("message"),
});

export const saved_project = pgTable("saved_project", {
	id: uuid("id").notNull().defaultRandom().primaryKey(),
	saved_at: timestamp("saved_at", { mode: "date" }).notNull().defaultNow(),
	project_id: uuid("project_id")
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	profile_id: text("profile_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
});
