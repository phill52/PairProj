"use client";

import Link from "next/link";

export function ProfileActions({ isSelf, userId }: { isSelf: boolean; userId: string; }) {
	return (
		<div className="mb-6 flex justify-end gap-3">
			{isSelf ? (
				<>
					<Link 
						href={`/profile/${userId}/edit`}
            			className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          			>
            		Edit Profile
          			</Link>

					{/* <Link
						href="/settings"
						className="rounded-lg border px-4 py-2 hover:bg-gray-100"
					>
						Settings
					</Link> */}
				</>
			) : (
				<>
					{/* <Link
						href="/messages"
						className="rounded-lg border px-4 py-2 hover:bg-gray-100"
					>
						Message
					</Link>

					<Link
						href="/invite"
						className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
					>
						Invite
					</Link> */}
				</>
			)}
		</div>
	);
}
