import {
	boolean,
	timestamp,
	mysqlTable,
	text,
	decimal,
	int,
	date,
	primaryKey,
	varchar,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";
import { createId } from "@paralleldrive/cuid2";

export const EXPERIENCE_LEVEL = {
	beginner: 1,
	intermediate: 2,
	advanced: 3,
};

export type ExperienceLevel =
	(typeof EXPERIENCE_LEVEL)[keyof typeof EXPERIENCE_LEVEL];

export const users = mysqlTable("user", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text("name"),
	username: varchar("username", { length: 255 }).unique(),
	first_name: text("first_name"),
	last_name: text("last_name"),
	email: text("email"),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
	bio: text("bio"),
	pronouns: text("pronouns"),
	experience_level: int("experience"),
	skill_level: int("skill_level"),
	avatar_location: text("avatar_location"),
	resume_location: text("resume_location"),
	created_at: timestamp("created_at", { mode: "date" })
		.notNull()
		.defaultNow(),
});

export const accounts = mysqlTable(
	"account",
	{
		userId: varchar("userId", { length: 255 })
			.notNull()
			.references(() => users.id, { onDelete: "restrict" }),
		type: varchar("type", { length: 255 })
			.$type<AdapterAccountType>()
			.notNull(),
		provider: varchar("provider", { length: 255 }).notNull(),
		providerAccountId: varchar("providerAccountId", {
			length: 255,
		}).notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: int("expires_at"),
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

export const authenticators = mysqlTable(
	"authenticator",
	{
		credentialID: varchar("credentialID", { length: 255 })
			.notNull()
			.unique(),
		userId: varchar("userId", { length: 255 })
			.notNull()
			.references(() => users.id, { onDelete: "restrict" }),
		providerAccountId: varchar("providerAccountId", {
			length: 255,
		}).notNull(),
		credentialPublicKey: text("credentialPublicKey").notNull(),
		counter: int("counter").notNull(),
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

export const sessions = mysqlTable("session", {
	sessionToken: varchar("sessionToken", { length: 255 }).primaryKey(),
	userId: varchar("userId", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "restrict" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mysqlTable(
	"verificationToken",
	{
		identifier: varchar("identifier", { length: 255 }).notNull(),
		token: varchar("token", { length: 255 }).notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.identifier, verificationToken.token],
		}),
	}),
);

export const profile_education = mysqlTable("prof_education", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	profile_id: varchar("profile_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "restrict" }),
	school_name: text("school_name").notNull(),
	major: text("major").notNull(),
	degree: text("degree").notNull(),
	start_date: date("start_date", { mode: "date" }).notNull(),
	end_date: date("end_date", { mode: "date" }),
	gpa: decimal("gpa"),
});

export const profile_work_experience = mysqlTable("prof_work_exp", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	profile_id: varchar("profile_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "restrict" }),
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

export const chat_room = mysqlTable("chat_room", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	owner_profile_id: varchar("owner_profile_id", { length: 255 }),
	name: text("name"),
});

export const chat_member = mysqlTable("chat_member", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	profile_id: varchar("profile_id", { length: 255 }),
	chat_room_id: varchar("chat_room_id", { length: 255 }),
	unread_messages: int("unread_messages"),
});

export const chat_message = mysqlTable("chat_message", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	sender_profile_id: varchar("sender_profile_id", { length: 255 }),
	chat_room_id: varchar("chat_room_id", { length: 255 }),
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

export const project = mysqlTable("project", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	name: text("name"),
	description: text("description"),
	owner_profile_id: varchar("owner_profile_id", { length: 255 })
		.references(() => users.id, { onDelete: "restrict" })
		.notNull(),
	skill_level: text("skill_level"),
	github_repository: text("github_repository"),
	is_locked: boolean("is_locked"),
	profile_picture: text("profile_picture"),
});

export const project_member = mysqlTable("proj_member", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	project_id: varchar("project_id", { length: 255 })
		.notNull()
		.references(() => project.id, { onDelete: "restrict" }),
	profile_id: varchar("profile_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "restrict" }),
	project_role: varchar("project_role", { length: 255 })
		.notNull()
		.references(() => role.id, { onDelete: "restrict" }),
	membership_status: int("membership_status"),
});

export const projectRelations = relations(project, ({ one, many }) => ({
	owner: one(users, {
		fields: [project.owner_profile_id],
		references: [users.id],
		relationName: "projectOwner",
	}),
	roles: many(project_role_relationship),
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

export const role = mysqlTable("role", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	name: text("name").notNull().notNull(),
});

export const roleRelations = relations(role, ({ many }) => ({
	users: many(profile_role_relationship),
	projectMembers: many(project_member),
	projectApplications: many(project_application),
	projectInvites: many(project_invite),
}));

export const project_role_relationship = mysqlTable("proj_role_rel", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	project_id: varchar("project_id", { length: 255 })
		.notNull()
		.references(() => project.id, { onDelete: "restrict" }),
	role_id: varchar("role_id", { length: 255 })
		.notNull()
		.references(() => role.id, { onDelete: "restrict" }),
});

export const projectRoleRelationshipRelations = relations(
	project_role_relationship,
	({ one, many }) => ({
		project: one(project, {
			fields: [project_role_relationship.project_id],
			references: [project.id],
		}),
		role: one(role, {
			fields: [project_role_relationship.role_id],
			references: [role.id],
		}),
		skills: many(project_role_skill_relationship),
	}),
);

export const project_role_skill_relationship = mysqlTable("proj_role_skill", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	project_role_id: varchar("project_role_id", { length: 255 })
		.notNull()
		.references(() => project_role_relationship.id, {
			onDelete: "restrict",
		}),
	skill_id: varchar("skill_id", { length: 255 })
		.notNull()
		.references(() => skill.id, {
			onDelete: "restrict",
		}),
	is_required: boolean("is_required"),
});

export const projectRoleSkillRelationshipRelations = relations(
	project_role_skill_relationship,
	({ one }) => ({
		projectRole: one(project_role_relationship, {
			fields: [project_role_skill_relationship.project_role_id],
			references: [project_role_relationship.id],
		}),
		skill: one(skill, {
			fields: [project_role_skill_relationship.skill_id],
			references: [skill.id],
		}),
	}),
);

export const profile_role_relationship = mysqlTable("prof_role_rel", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	profile_id: varchar("profile_id", { length: 255 })
		.notNull()
		.references(() => users.id, {
			onDelete: "restrict",
		}),
	role_id: varchar("role_id", { length: 255 })
		.notNull()
		.references(() => role.id, {
			onDelete: "restrict",
		}),
});

export const areas_of_interest = mysqlTable("areas_of_interest", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	name: text("name").notNull(),
	inner_color: text("inner_color").notNull(),
	outer_color: text("outer_color").notNull(),
});

export const profile_area_relationship = mysqlTable("prof_area_rel", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	profile_id: varchar("profile_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "restrict" }),
	area_id: varchar("area_id", { length: 255 })
		.notNull()
		.references(() => areas_of_interest.id, { onDelete: "restrict" }),
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

export const skill = mysqlTable("skill", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
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

export const profile_skill_relationship = mysqlTable(
	"prof_skill_rel",
	{
		profile_id: varchar("profile_id", { length: 255 })
			.notNull()
			.references(() => users.id, { onDelete: "restrict" }),
		skill_id: varchar("skill_id", { length: 255 })
			.notNull()
			.references(() => skill.id, { onDelete: "restrict" }),
		experience_level: int("experience_level").notNull(),
	},
	(table) => ({
		experienceLevelCheck: sql`check(${table.experience_level} in (${sql.join(Object.values(SKILL_LEVELS))}))`,
	}),
);

export const project_skill_relationship = mysqlTable(
	"project_skill_relationship",
	{
		id: varchar("id", { length: 255 })
			.primaryKey()
			.notNull()
			.$defaultFn(() => createId()),
		project_id: varchar("project_id", { length: 255 })
			.notNull()
			.references(() => project.id, { onDelete: "restrict" }),
		skill_id: varchar("skill_id", { length: 255 })
			.notNull()
			.references(() => skill.id, { onDelete: "restrict" }),
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

export const project_application = mysqlTable("proj_application", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	project_id: varchar("project_id", { length: 255 })
		.notNull()
		.references(() => project.id, { onDelete: "restrict" }),
	applicant_profile_id: varchar("applicant_profile_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "restrict" }),
	role_id: varchar("role_id", { length: 255 })
		.notNull()
		.references(() => role.id, { onDelete: "restrict" }),
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

export const project_invite = mysqlTable("proj_invite", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
	project_id: varchar("project_id", { length: 255 })
		.notNull()
		.references(() => project.id, { onDelete: "restrict" }),
	inviter_id: varchar("inviter_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "restrict" }),
	invitee_id: varchar("invitee_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "restrict" }),
	role_id: varchar("role_id", { length: 255 })
		.notNull()
		.references(() => role.id, { onDelete: "restrict" }),
	message: text("message"),
	status: int("status"),
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

export const project_collaborator = mysqlTable("proj_collaborator", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" }),
	project_id: varchar("project_id", { length: 255 }),
	profile_id: varchar("profile_id", { length: 255 }),
	role_id: varchar("role_id", { length: 255 })
		.notNull()
		.references(() => role.id, { onDelete: "restrict" }),
});

export const project_news = mysqlTable("proj_news", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	created_at: timestamp("created_at", { mode: "date" })
		.notNull()
		.defaultNow(),
	project_id: varchar("project_id", { length: 255 })
		.notNull()
		.references(() => project.id, { onDelete: "restrict" }),
	message: text("message"),
});

export const projectNewsRelations = relations(project_news, ({ one }) => ({
	project: one(project, {
		fields: [project_news.project_id],
		references: [project.id],
	}),
}));

export const saved_project = mysqlTable("saved_proj", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	saved_at: timestamp("saved_at", { mode: "date" }).notNull().defaultNow(),
	project_id: varchar("project_id", { length: 255 })
		.notNull()
		.references(() => project.id, { onDelete: "restrict" }),
	profile_id: varchar("profile_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "restrict" }),
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
