import {
	boolean,
	timestamp,
	pgTable,
	text,
	numeric,
	integer,
	bigint,
	date,
	primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { relations } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";
import { int } from "drizzle-orm/mysql-core";
import dotenv from "dotenv";
import { createId } from "@paralleldrive/cuid2";
import { profile } from "console";

// dotenv.config({
// 	path: ".env",
// });
// const connectionString: string = process.env.DATABASE_URL as string;
// if (!connectionString) {
// 	throw new Error("DATABASE_URL is not defined");
// }

// let sslmode = "";
// if (process.env.APP_ENV === "prod") {
// 	sslmode = "?sslmode=require";
// }
// const pool = postgres(connectionString + sslmode, { max: 1 });
// export const db = drizzle(pool, { logger: true });

export const EXPERIENCE_LEVEL = {
	beginner: 1,
	intermediate: 2,
	advanced: 3,
} as const;

export type ExperienceLevel =
	(typeof EXPERIENCE_LEVEL)[keyof typeof EXPERIENCE_LEVEL];

export const users = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text("name"),
	username: text("username").unique(),
	first_name: text("first_name"),
	last_name: text("last_name"),
	email: text("email"),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
	bio: text("bio"),
	pronouns: text("pronouns"),
	experience_level: integer("experience"),
	skill_level: integer("skill_level"),
	avatar_location: text("avatar_location"),
	resume_location: text("resume_location"),
	created_at: timestamp("created_at", { mode: "date" })
		.notNull()
		.defaultNow(),
});

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

export const usersRelations = relations(users, ({ many, one }) => ({
	ownedProjects: many(project, { relationName: "projectOwner" }),
	projectMemberships: many(project_member, {
		relationName: "projectMembers",
	}),
	roles: many(profile_role_relationship),
	areas: many(profile_area_relationship),
	skills: many(profile_skill_relationship),
	educations: many(profile_education),
	workExperiences: many(profile_work_experience),
	sentInvites: many(project_invite, { relationName: "inviteSent" }),
	receivedInvites: many(project_invite, { relationName: "inviteReceived" }),
	savedProjects: many(saved_project),
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

export const profile_education = pgTable("profile_education", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	profile_id: text("profile_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	school_name: text("school_name").notNull(),
	major: text("major").notNull(),
	degree: text("degree").notNull(),
	start_date: date("start_date", { mode: "date" }).notNull(),
	end_date: date("end_date", { mode: "date" }),
	gpa: numeric("gpa"),
});

export const profile_work_experience = pgTable("profile_work_experience", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	profile_id: text("profile_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	company_name: text("company_name").notNull(),
	job_title: text("job_title").notNull(),
	job_description: text("job_description").notNull(),
	start_date: date("start_date", { mode: "date" }).notNull(),
	end_date: date("end_date", { mode: "date" }),
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

export const chat_room = pgTable("chat_room", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	owner_profile_id: text("owner_profile_id"),
	name: text("name"),
});

export const chat_member = pgTable("chat_member", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	profile_id: text("profile_id"),
	chat_room_id: text("chat_room_id"),
	unread_messages: integer("unread_messages"),
});

export const chat_message = pgTable("chat_message", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	sender_profile_id: text("sender_profile_id"),
	chat_room_id: text("chat_room_id"),
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
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	name: text("name"),
	description: text("description"),
	owner_profile_id: text("owner_profile_id")
		.references(() => users.id, { onDelete: "set null" })
		.notNull(),
	skill_level: text("skill_level"),
	github_repository: text("github_repository"),
	is_locked: boolean("is_locked"),
	profile_picture: text("profile_picture"),
});

export const project_member = pgTable("project_member", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	project_id: text("project_id")
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	profile_id: text("profile_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	project_role: bigint("project_role", { mode: "number" }).references(
		() => role.id,
		{
			onDelete: "set null",
		},
	),
	membership_status: integer("membership_status"),
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
		relationName: "projectMembers",
	}),
	role: one(role, {
		fields: [project_member.project_role],
		references: [role.id],
	}),
}));

export const role = pgTable("role", {
	id: bigint("id", { mode: "number" })
		.primaryKey()
		.notNull()
		.generatedAlwaysAsIdentity(),
	name: text("name").notNull().notNull(),
});

export const roleRelations = relations(role, ({ many }) => ({
	users: many(profile_role_relationship),
	projectMembers: many(project_member),
	projectApplications: many(project_application),
	projectInvites: many(project_invite),
}));

export const profile_role_relationship = pgTable("profile_role_relationship", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	profile_id: text("profile_id")
		.notNull()
		.references(() => users.id, {
			onDelete: "cascade",
		}),
	role_id: bigint("role_id", { mode: "number" })
		.notNull()
		.references(() => role.id, {
			onDelete: "cascade",
		}),
});

export const areas_of_interest = pgTable("areas_of_interest", {
	id: bigint("id", { mode: "number" })
		.primaryKey()
		.notNull()
		.generatedAlwaysAsIdentity(),
	name: text("name").notNull(),
	inner_color: text("inner_color").notNull(),
	outer_color: text("outer_color").notNull(),
});

export const profile_area_relationship = pgTable("profile_area_relationship", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	profile_id: text("profile_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	area_id: bigint("area_id", { mode: "number" })
		.notNull()
		.references(() => areas_of_interest.id, { onDelete: "cascade" }),
});

export const profileAreaRelationship = relations(
	profile_area_relationship,
	({ one }) => ({
		user: one(users, {
			fields: [profile_area_relationship.profile_id],
			references: [users.id],
		}),
		area: one(areas_of_interest, {
			fields: [profile_area_relationship.area_id],
			references: [areas_of_interest.id],
		}),
	}),
);

export const profileRoleRelationshipRelations = relations(
	profile_role_relationship,
	({ one }) => ({
		user: one(users, {
			fields: [profile_role_relationship.profile_id],
			references: [users.id],
		}),
		role: one(role, {
			fields: [profile_role_relationship.role_id],
			references: [role.id],
		}),
	}),
);

export const skill = pgTable("skill", {
	id: bigint("id", { mode: "number" })
		.primaryKey()
		.notNull()
		.generatedAlwaysAsIdentity(),
	name: text("name").notNull(),
	icon_location: text("icon_location").notNull(),
	inner_color: text("inner_color").notNull(),
	outer_color: text("outer_color").notNull(),
});

export const SKILL_LEVELS = {
	all_skills: 1,
	best_skills: 2,
} as const;

export type SkillLevel = (typeof SKILL_LEVELS)[keyof typeof SKILL_LEVELS];

export const profile_skill_relationship = pgTable(
	"profile_skill_relationship",
	{
		profile_id: text("profile_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		skill_id: bigint("skill_id", { mode: "number" })
			.notNull()
			.references(() => skill.id, { onDelete: "cascade" }),
		experience_level: integer("experience_level").notNull(),
	},
	(table) => ({
		experienceLevelCheck: sql`check(${table.experience_level} in (${sql.join(Object.values(SKILL_LEVELS))}))`,
	}),
);

export const project_skill_relationship = pgTable(
	"project_skill_relationship",
	{
		id: text("id")
			.primaryKey()
			.notNull()
			.$defaultFn(() => createId()),
		project_id: text("project_id")
			.notNull()
			.references(() => project.id, { onDelete: "cascade" }),
		skill_id: bigint("skill_id", { mode: "number" })
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
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	project_id: text("project_id")
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	applicant_profile_id: text("applicant_profile_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	role_id: bigint("role_id", { mode: "number" }).references(() => role.id, {
		onDelete: "set null",
	}),
	message: text("message"),
	is_denied: boolean("is_denied"),
});

export const projectApplicationRelations = relations(
	project_application,
	({ one }) => ({
		project: one(project, {
			fields: [project_application.project_id],
			references: [project.id],
		}),
		profile: one(users, {
			fields: [project_application.applicant_profile_id],
			references: [users.id],
		}),
		role: one(role, {
			fields: [project_application.role_id],
			references: [role.id],
		}),
	}),
);

export const project_invite = pgTable("project_invite", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	project_id: text("project_id")
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	inviter_id: text("inviter_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	invitee_id: text("invitee_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	role_id: bigint("role_id", { mode: "number" }).references(() => role.id, {
		onDelete: "set null",
	}),
	message: text("message"),
	status: integer("status"),
});

export const projectInviteRelations = relations(project_invite, ({ one }) => ({
	project: one(project, {
		fields: [project_invite.project_id],
		references: [project.id],
	}),
	inviter: one(users, {
		fields: [project_invite.inviter_id],
		references: [users.id],
		relationName: "inviteSent",
	}),
	invitee: one(users, {
		fields: [project_invite.invitee_id],
		references: [users.id],
		relationName: "inviteReceived",
	}),
	role: one(role, {
		fields: [project_invite.role_id],
		references: [role.id],
	}),
}));

export const project_collaborator = pgTable("project_collaborator", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }),
	project_id: text("project_id"),
	profile_id: text("profile_id"),
	role_id: bigint("role_id", { mode: "number" }),
});

export const project_news = pgTable("project_news", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" })
		.notNull()
		.defaultNow(),
	project_id: text("project_id")
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	message: text("message"),
});

export const projectNewsRelations = relations(project_news, ({ one }) => ({
	project: one(project, {
		fields: [project_news.project_id],
		references: [project.id],
	}),
}));

export const saved_project = pgTable("saved_project", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	saved_at: timestamp("saved_at", { mode: "date" }).notNull().defaultNow(),
	project_id: text("project_id")
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	profile_id: text("profile_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
});

export const savedProjectRelations = relations(saved_project, ({ one }) => ({
	project: one(project, {
		fields: [saved_project.project_id],
		references: [project.id],
	}),
	user: one(users, {
		fields: [saved_project.profile_id],
		references: [users.id],
	}),
}));
