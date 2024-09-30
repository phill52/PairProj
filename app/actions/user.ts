"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/db/auth";
import {
	users,
	skill,
	areas_of_interest,
	role,
	profile_role_relationship,
	profile_skill_relationship,
	profile_area_relationship,
	profile_education,
	profile_work_experience,
} from "@/db/schema";
import { z } from "zod";
import {
	CreateProfileProps,
	SubmitProfile,
	ViewProfileProps,
	Skill,
	EducationItem,
	ExperienceItem,
	UserProfileProject,
} from "@/types/profile-items";
import { db } from "@/db";
import { SubmitProfileZSchema } from "@/utils/validation/user";

export const getUser = async (id: string, selectFields?: string[]) => {
	const session = await auth();
	if (!session) {
		return { error: "Not authorized" };
	}
	const user = await db.select().from(users).where(eq(users.id, id));
	return user;
};

export const getCreateProfileProps = async (): Promise<CreateProfileProps> => {
	let session;
	try {
		session = await auth();
		if (!session) {
			throw new Error("Not authorized");
		}
	} catch (error) {
		console.error("Error during authentication:", error);

		throw new Error("Error during authentication:");
	}
	const id = session.user.id;
	const [user] = await db.query.users.findMany({
		where: eq(users.id, id),
		columns: {
			id: true,
			username: true,
			first_name: true,
			last_name: true,
			pronouns: true,
			bio: true,
		},
		with: {
			skills: {
				columns: {
					experience_level: true,
				},
				with: {
					skill: {
						columns: {
							id: true,
							name: true,
							inner_color: true,
							outer_color: true,
							icon_location: true,
						},
					},
				},
			},
			areas: {
				with: {
					area: {
						columns: {
							id: true,
							name: true,
							inner_color: true,
							outer_color: true,
						},
					},
				},
			},
			educations: {
				columns: {
					id: true,
					school_name: true,
					degree: true,
					major: true,
					start_date: true,
					end_date: true,
				},
			},
			workExperiences: {
				columns: {
					id: true,
					company_name: true,
					job_title: true,
					job_description: true,
					start_date: true,
					end_date: true,
				},
			},
			roles: {
				with: {
					role: {
						columns: {
							id: true,
							name: true,
						},
					},
				},
			},
		},
		limit: 1,
	});
	const skills = await db.select().from(skill);
	const areas = await db.select().from(areas_of_interest);
	const roles = await db.select().from(role);
	const profile = {
		username: user.username,
		first_name: user.first_name,
		last_name: user.last_name,
		account_type: user.roles.map((r) => r.role),
		best_skills: user.skills.reduce(
			(acc, s) => {
				if (s.experience_level >= 3) {
					acc.push(s.skill);
				}
				return acc;
			},
			[] as (typeof user.skills)[number]["skill"][],
		),
		all_skills: user.skills.map((s) => s.skill),
		areas: user.areas.map((a) => a.area),
		education: user.educations.map((e) => {
			return {
				id: e.id,
				school: e.school_name,
				degree: e.degree,
				field: e.major,
				startDate: e.start_date,
				endDate: e.end_date,
			};
		}),
		experience: user.workExperiences.map((e) => {
			return {
				id: e.id,
				company: e.company_name,
				position: e.job_title,
				description: e.job_description,
				startDate: e.start_date,
				endDate: e.end_date,
			};
		}),
		pronouns: user.pronouns,
		bio: user.bio,
	};
	return {
		profile,
		skills,
		areas,
		roles,
	};
};

export async function getViewProfileProps(
	userId: string,
): Promise<ViewProfileProps | null> {
	try {
		const [userData] = await db.query.users.findMany({
			where: eq(users.id, userId),
			columns: {
				id: true,
				username: true,
				first_name: true,
				last_name: true,
				pronouns: true,
				bio: true,
				email: true,
				skill_level: true,
				resume_location: true,
				avatar_location: true,
			},
			with: {
				skills: {
					columns: {
						experience_level: true,
					},
					with: {
						skill: {
							columns: {
								id: true,
								name: true,
								inner_color: true,
								outer_color: true,
								icon_location: true,
							},
						},
					},
				},
				areas: {
					with: {
						area: {
							columns: {
								id: true,
								name: true,
								inner_color: true,
								outer_color: true,
							},
						},
					},
				},
				educations: {
					columns: {
						id: true,
						school_name: true,
						degree: true,
						major: true,
						start_date: true,
						end_date: true,
					},
				},
				workExperiences: {
					columns: {
						id: true,
						company_name: true,
						job_title: true,
						job_description: true,
						start_date: true,
						end_date: true,
					},
				},
				roles: {
					with: {
						role: {
							columns: {
								id: true,
								name: true,
							},
						},
					},
				},
				projectMemberships: {
					with: {
						project: {
							columns: {
								id: true,
								name: true,
								description: true,
							},
							with: {
								skills: {
									with: {
										skill: {
											columns: {
												name: true,
												inner_color: true,
												outer_color: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
			limit: 1,
		});

		if (!userData) {
			return null;
		}

		const allSkills: Skill[] = userData.skills.map((s) => ({
			name: s.skill.name,
			innerColor: s.skill.inner_color,
			outerColor: s.skill.outer_color,
		}));

		const bestSkills: Skill[] = userData.skills
			.filter((s) => s.experience_level === 2)
			.map((s) => ({
				name: s.skill.name,
				innerColor: s.skill.inner_color,
				outerColor: s.skill.outer_color,
			}));

		const education: EducationItem[] = userData.educations.map((e) => ({
			school: e.school_name,
			degree: e.degree || "",
			field: e.major || "",
			startDate: e.start_date!,
			endDate: e.end_date,
		}));

		const experience: ExperienceItem[] = userData.workExperiences.map(
			(e) => ({
				company: e.company_name,
				position: e.job_title,
				description: e.job_description || "",
				startDate: e.start_date!,
				endDate: e.end_date,
			}),
		);

		const pastProjects: UserProfileProject[] =
			userData.projectMemberships.map((pm) => ({
				id: Number(pm.project.id),
				name: pm.project.name || "",
				description: pm.project.description || "",
				picture: "", // You might need to add this field to your project table
				skills: pm.project.skills.map((s) => ({
					name: s.skill.name,
					innerColor: s.skill.inner_color,
					outerColor: s.skill.outer_color,
				})),
			}));

		return {
			username: userData.username || "",
			first_name: userData.first_name || "",
			last_name: userData.last_name || "",
			bio: userData.bio || "",
			skill_level: userData.skill_level?.toString() || "",
			resume_location: userData.resume_location || "",
			avatar_location: userData.avatar_location || "",
			email: userData.email || "",
			role: userData.roles[0]?.role.name || "",
			pronouns: userData.pronouns || "",
			all_skills: allSkills,
			best_skills: bestSkills,
			education,
			past_projects: pastProjects,
			experience,
		};
	} catch (error) {
		console.error("Error fetching profile data:", error);
		return null;
	}
}

export const createProfile = async (profile: SubmitProfile) => {
	console.log(profile);
	// Validate the input data
	let validatedProfile: z.infer<typeof SubmitProfileZSchema>;
	try {
		validatedProfile = SubmitProfileZSchema.parse(profile);
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error(
				JSON.stringify(
					error.errors.map((err) => ({
						path: err.path.join("."),
						message: err.message,
					})),
				),
			);
		}
		console.error("Unexpected error during validation:", error);
		throw new Error("An unexpected error occurred during validation");
	}
	// Check authorization
	const session = await auth();
	if (!session) {
		throw new Error("Not authorized");
	}

	// Update database
	try {
		const id = session.user.id;
		// Double check if the user exists in the db
		const user = await db
			.select({ id: users.id })
			.from(users)
			.where(eq(users.id, id));
		if (!user) {
			throw new Error("User not found");
		}

		const username = await db
			.select({ id: users.id, username: users.username })
			.from(users)
			.where(eq(users.username, validatedProfile.username));
		console.log(username);
		if (username.length > 0 && username[0].id !== id) {
			throw new Error("Username already exists");
		}

		await db.transaction(async (db) => {
			await db.transaction(async (tx) => {
				// Update user table
				await tx
					.update(users)
					.set({
						username: validatedProfile.username,
						first_name: validatedProfile.first_name,
						last_name: validatedProfile.last_name,
						pronouns: validatedProfile.pronouns,
						bio: validatedProfile.bio,
					})
					.where(eq(users.id, id));

				// Update roles
				if (validatedProfile.account_type.length > 0) {
					await tx
						.delete(profile_role_relationship)
						.where(eq(profile_role_relationship.profile_id, id));
					await tx.insert(profile_role_relationship).values(
						validatedProfile.account_type.map((role) => ({
							profile_id: id,
							role_id: role.id,
						})),
					);
				}

				// Update skills
				if (
					validatedProfile.best_skills.length > 0 ||
					validatedProfile.all_skills.length > 0
				) {
					await tx
						.delete(profile_skill_relationship)
						.where(eq(profile_skill_relationship.profile_id, id));
					await tx.insert(profile_skill_relationship).values([
						...validatedProfile.best_skills.map((skill) => ({
							profile_id: id,
							skill_id: skill.id,
							experience_level: 3, // Assuming 2 represents best skills
						})),
						...validatedProfile.all_skills.map((skill) => ({
							profile_id: id,
							skill_id: skill.id,
							experience_level: 1, // Assuming 1 represents all skills
						})),
					]);
				}

				// Update areas of interest
				if (validatedProfile.areas.length > 0) {
					await tx
						.delete(profile_area_relationship)
						.where(eq(profile_area_relationship.profile_id, id));
					await tx.insert(profile_area_relationship).values(
						validatedProfile.areas.map((area) => ({
							profile_id: id,
							area_id: area.id,
						})),
					);
				}

				// Update education
				if (validatedProfile.education.length > 0) {
					await tx
						.delete(profile_education)
						.where(eq(profile_education.profile_id, id));
					await tx.insert(profile_education).values(
						validatedProfile.education.map((edu) => ({
							profile_id: id,
							school_name: edu.school,
							major: edu.field,
							degree: edu.degree,
							start_date: edu.startDate,
							end_date: edu.endDate,
							gpa: "3.2", //change this later
						})),
					);
				}

				// Update work experience
				if (validatedProfile.experience.length > 0) {
					await tx
						.delete(profile_work_experience)
						.where(eq(profile_work_experience.profile_id, id));
					await tx.insert(profile_work_experience).values(
						validatedProfile.experience.map((exp) => ({
							profile_id: id,
							company_name: exp.company,
							job_title: exp.position,
							job_description: exp.description,
							start_date: exp.startDate,
							end_date: exp.endDate,
						})),
					);
				}
			});
		});

		// await db.update(users).set(validatedProfile).where(eq(users.id, id));

		await revalidatePath(`/users/${id}`);

		return { success: true };
	} catch (error) {
		console.error("Error updating database:", error);
		throw new Error("An error occurred while updating the profile");
	}
};
