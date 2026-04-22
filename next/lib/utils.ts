import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getMembershipStatus(
	tx: any,
	projectId: string,
	userId: string,
) {
	try {
		return tx.projectMembership.findFirst({
			where: {
				projectId,
				userId,
				role: { is: { name: "owner" } },
			},
		});
	} catch (e) {
		throw new Error("Failed to fetch membership status");
	}
}
