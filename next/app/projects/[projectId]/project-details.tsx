"use client";
import React, { useState } from "react";
import {
	applyToProject,
	acceptProjectApplicant,
	denyProjectApplicant,
} from "@/app/actions/projects";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	Button,
	Avatar,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	Textarea,
} from "@/components/ui";
import { ProjectProps } from "@/types/projects";
import Badge from "@/components/badge";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { routes } from "@/routes/routes";

export default function ProjectComponent({
	project,
}: {
	project: ProjectProps & any;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
	const [selectedRole, setSelectedRole] = useState<any>(null);
	const [selectedApplicantsRole, setSelectedApplicantsRole] =
		useState<any>(null);
	const [description, setDescription] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [applications, setApplications] = useState<any[]>(
		project.applications || [],
	);
	const [applicantActionError, setApplicantActionError] = useState<
		string | null
	>(null);
	const [processingApplicationId, setProcessingApplicationId] = useState<
		string | null
	>(null);
	const projectApplicants = applications.filter(
		(application: any) => application?.user?.id,
	);
	const visibleRoles = (project.roles || []).filter(
		(role: any) => (role?.name || "").trim().toLowerCase() !== "owner",
	);
	const roleApplicants = projectApplicants.filter(
		(application: any) =>
			application?.role?.id &&
			application?.status === "pending" &&
			selectedApplicantsRole?.id &&
			application.role.id === selectedApplicantsRole.id,
	);

	const handleApplyClick = (role: any) => {
		setSelectedRole(role);
		setDescription("");
		setIsModalOpen(true);
	};

	const handleClose = () => {
		setSelectedRole(null);
		setDescription("");
		setIsModalOpen(false);
		setError(null);
	};

	const handleViewApplicantsClick = (role: any) => {
		setSelectedApplicantsRole(role);
		setIsApplicantsModalOpen(true);
	};

	const handleCloseApplicantsModal = () => {
		setSelectedApplicantsRole(null);
		setIsApplicantsModalOpen(false);
		setApplicantActionError(null);
	};

	const handleApplicantDecision = async (
		applicationId: string,
		decision: "accept" | "deny",
	) => {
		setApplicantActionError(null);
		setProcessingApplicationId(applicationId);
		try {
			const result =
				decision === "accept"
					? await acceptProjectApplicant(applicationId)
					: await denyProjectApplicant(applicationId);

			if (!result.success) {
				throw new Error(
					result.message ||
						`Failed to ${decision === "accept" ? "accept" : "deny"} applicant.`,
				);
			}

			setApplications((prev) =>
				prev.map((application) =>
					application.id === applicationId
						? {
								...application,
								status:
									decision === "accept"
										? "accepted"
										: "denied",
							}
						: application,
				),
			);
		} catch (actionError) {
			if (actionError instanceof Error) {
				setApplicantActionError(actionError.message);
			}
		} finally {
			setProcessingApplicationId(null);
		}
	};

	const handleApplySubmit = async () => {
		if (!selectedRole) return;
		setError(null);
		try {
			const result = await applyToProject(
				project.id,
				selectedRole.id,
				description,
			);
			if (!result.success) {
				throw new Error(
					result.message || "Failed to submit application",
				);
			}
			project.rolesAppliedTo = [
				...(project.rolesAppliedTo || []),
				selectedRole.id,
			];
			handleClose();
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			}
		}
	};

	return (
		<>
			<Card className="mx-auto my-8 max-w-[90%] rounded-lg bg-white shadow-lg">
				<CardHeader className="border-b p-6 pb-6">
					<div className="flex items-start justify-between gap-4">
						<div>
							<CardTitle className="text-2xl font-bold">
								{project.name}
							</CardTitle>
							<p className="text-gray-600">
								{project.description}
							</p>
						</div>
					</div>

					<div className="mt-4 flex flex-col gap-2">
						{project.difficulty && (
							<div className="font-semibold">
								Difficulty:{" "}
								<strong>{project.difficulty}</strong>
							</div>
						)}
						{project.githubLink && (
							<div>
								<a
									href={project.githubLink}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									GitHub Repository
								</a>
							</div>
						)}
					</div>

					{/* Owner and members */}
					<div className="mt-4 flex items-center gap-4">
						{project.owner ? (
							<Link
								href={routes.users.profile({
									id: project.owner.id,
								})}
							>
								<div className="flex items-center gap-3">
									<Avatar className="h-10 w-10">
										<AvatarImage
											src={
												project.owner.image || undefined
											}
											alt={
												project.owner.name ||
												"Project Owner"
											}
										/>
										<AvatarFallback className="text-sm">
											{project.owner.name?.[0] || "O"}
										</AvatarFallback>
									</Avatar>
									<div>
										<div className="text-sm font-semibold">
											{project.owner.name}
										</div>
										<div className="text-xs text-gray-500">
											Project Owner
										</div>
									</div>
								</div>
							</Link>
						) : null}

						{project.members && project.members.length > 0 ? (
							<div className="ml-4 flex items-center gap-2">
								{project.members.slice(0, 5).map((m: any) => (
									<Link
										href={routes.users.profile({
											id: m.id,
										})}
									>
										<div className="flex items-center gap-3">
											<Avatar className="h-10 w-10">
												<AvatarImage
													src={
														m.image ||
														undefined
													}
													alt={
														m.name ||
														"Project Owner"
													}
												/>
												<AvatarFallback className="text-sm">
													{m.name?.[0] ||
														"O"}
												</AvatarFallback>
											</Avatar>
											<div>
												<div className="text-sm font-semibold">
													{m.name}
												</div>
												<div className="text-xs text-gray-500">
													{m.projectMembership?.role?.name ||
														"Member"}
												</div>
											</div>
										</div>
									</Link>
								))}
								{project.members.length > 5 && (
									<span className="text-sm text-gray-500">
										+{project.members.length - 5}
									</span>
								)}
							</div>
						) : null}
					</div>
				</CardHeader>

				<CardContent className="p-6">
					{visibleRoles.length > 0 ? (
						<section className="mb-6">
							<h2 className="mb-4 text-xl font-semibold">
								Looking for Help
							</h2>
							<div className="grid gap-4">
								{visibleRoles.map((role: any) => (
									<div
										key={role.id}
										className="rounded-lg border border-gray-200 p-4"
									>
										<div className="flex items-start justify-between">
											<h3 className="mb-3 text-lg font-semibold">
												<Link
													href={`${routes.projects.project({ id: project.id })}/roles/${role.id}`}
												>
													{role.name}
												</Link>
											</h3>
											{project.isOwner ? (
												<Button
													variant="outline"
													onClick={() =>
														handleViewApplicantsClick(
															role,
														)
													}
												>
													View Applicants
												</Button>
											) : !project.rolesAppliedTo?.includes(
													role.id,
											  ) ? (
												<Button
													onClick={() =>
														handleApplyClick(role)
													}
												>
													Apply
												</Button>
											) : (
												<span className="font-medium text-green-600">
													Applied!
												</span>
											)}
										</div>

										<div className="mb-3 flex flex-col gap-2">
											<div>
												<strong className="text-sm text-gray-700">
													Required Skills:
												</strong>
												<div className="mt-1 flex flex-wrap gap-2">
													{role.requiredSkills
														.length > 0 ? (
														role.requiredSkills.map(
															(skill: any) => (
																<Badge
																	text={
																		skill.name
																	}
																	key={
																		skill.id
																	}
																	innerColor={
																		skill.innerColor
																	}
																	outerColor={
																		skill.outerColor
																	}
																	className={
																		(
																			skill.name ||
																			""
																		)
																			.toLowerCase()
																			.includes(
																				"vs",
																			) ||
																		(
																			skill.name ||
																			""
																		)
																			.toLowerCase()
																			.includes(
																				"visual",
																			)
																			? "ring-2 ring-yellow-400"
																			: ""
																	}
																/>
															),
														)
													) : (
														<span className="text-sm text-gray-500">
															None
														</span>
													)}
												</div>
											</div>

											<div>
												<strong className="text-sm text-gray-700">
													Optional Skills:
												</strong>
												<div className="mt-1 flex flex-wrap gap-2">
													{role.optionalSkills
														.length > 0 ? (
														role.optionalSkills.map(
															(skill: any) => (
																<Badge
																	text={
																		skill.name
																	}
																	key={
																		skill.id
																	}
																	innerColor={
																		skill.innerColor
																	}
																	outerColor={
																		skill.outerColor
																	}
																	className={
																		(
																			skill.name ||
																			""
																		)
																			.toLowerCase()
																			.includes(
																				"vs",
																			) ||
																		(
																			skill.name ||
																			""
																		)
																			.toLowerCase()
																			.includes(
																				"visual",
																			)
																			? "ring-2 ring-yellow-400"
																			: ""
																	}
																/>
															),
														)
													) : (
														<span className="text-sm text-gray-500">
															None
														</span>
													)}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</section>
					) : null}
				</CardContent>
			</Card>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="[&>button]:hidden">
					<DialogHeader>
						<DialogTitle>
							Apply for {selectedRole?.name}
						</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div>
							<p
								id="error"
								className="text-red-500"
								hidden={!error}
							>
								{error}
							</p>
							<label className="mb-2 block text-sm font-medium">
								Tell us about yourself
							</label>
							<Textarea
								placeholder="Please provide a brief description of yourself and why you're interested in this role."
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="min-h-[120px]"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => handleClose()}>
							Cancel
						</Button>
						<Button
							onClick={handleApplySubmit}
							disabled={!description.trim()}
						>
							Apply
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog
				open={isApplicantsModalOpen}
				onOpenChange={(open) => {
					if (!open) {
						handleCloseApplicantsModal();
						return;
					}
					setIsApplicantsModalOpen(true);
				}}
			>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>
							Applicants for {selectedApplicantsRole?.name}
						</DialogTitle>
					</DialogHeader>
					<div className="max-h-[60vh] space-y-3 overflow-y-auto pr-1">
						{applicantActionError ? (
							<p className="text-sm text-red-500">
								{applicantActionError}
							</p>
						) : null}
						{roleApplicants.length === 0 ? (
							<p className="text-sm text-gray-500">
								No applicants yet for this role.
							</p>
						) : (
							roleApplicants.map((application: any) => (
								<div
									key={application.id}
									className="rounded-md border border-gray-200 p-3"
								>
									<div className="flex items-center justify-between gap-3">
										<Link
											href={routes.users.profile({
												id: application.user.id,
											})}
											className="flex items-center gap-2"
										>
											<Avatar className="h-8 w-8">
												<AvatarImage
													src={
														application.user
															.image || undefined
													}
													alt={
														application.user.name ||
														"Applicant"
													}
												/>
												<AvatarFallback>
													{
														(application.user
															.name ||
															application.user
																.email ||
															"A")[0]
													}
												</AvatarFallback>
											</Avatar>
											<div className="text-sm font-medium">
												{application.user.name ||
													application.user.email}
											</div>
										</Link>
										<div className="text-right text-xs text-gray-500">
											<div>
												Role:{" "}
												{application.role?.name ||
													"Unknown"}
											</div>
											<div className="capitalize">
												Status: {application.status}
											</div>
										</div>
									</div>
									{application.body ? (
										<p className="mt-2 text-sm text-gray-700">
											{application.body}
										</p>
									) : null}
									<div className="mt-3 flex justify-end gap-2">
										<Button
											size="sm"
											onClick={() =>
												handleApplicantDecision(
													application.id,
													"accept",
												)
											}
											disabled={
												processingApplicationId ===
												application.id
											}
										>
											Accept
										</Button>
										<Button
											size="sm"
											variant="destructive"
											onClick={() =>
												handleApplicantDecision(
													application.id,
													"deny",
												)
											}
											disabled={
												processingApplicationId ===
												application.id
											}
										>
											Deny
										</Button>
									</div>
								</div>
							))
						)}
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={handleCloseApplicantsModal}
						>
							Close
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
