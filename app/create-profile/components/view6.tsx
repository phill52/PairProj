import Image from "next/image";
import { SubmitProfileDataAction } from "../create-profile";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitProfile } from "@/types/profile-items";
import { createProfile } from "@/app/actions/user";
//TODO: add profile picture
export default function View6({
	Profile,
	OnUpdate,
}: {
	Profile: SubmitProfile;
	OnUpdate: React.Dispatch<SubmitProfileDataAction>;
}) {
	const updateName = (name: string) => {
		OnUpdate({
			type: "SET_USERNAME",
			payload: name,
		});
	};

	const updatePronouns = (pronouns: string) => {
		OnUpdate({
			type: "SET_PRONOUNS",
			payload: pronouns,
		});
	};

	const updateBio = (bio: string) => {
		OnUpdate({
			type: "SET_BIO",
			payload: bio,
		});
	};

	return (
		<div className="flex flex-col items-center">
			<h1 className="mb-4 text-3xl font-bold">Profile</h1>
			<div className="flex flex-col items-center">
				<div className="mb-4 flex flex-col items-center">
					<label className="mb-2 text-lg">Username</label>
					<Input
						type="text"
						defaultValue={Profile.username || ""}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							updateName(e.target.value)
						}
						className="w-64 rounded-lg border-2 border-gray-300 p-2"
					/>
				</div>
				{/* first name last name */}
				<div className="mb-4 flex flex-row items-center">
					<div>
						<label>First Name</label>
						<Input
							type="text"
							defaultValue={Profile.first_name || ""}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>,
							) =>
								OnUpdate({
									type: "SET_FIRSTNAME",
									payload: e.target.value,
								})
							}
							className="w-32 rounded-lg border-2 border-gray-300 p-2"
						/>
					</div>
					<div>
						<label>Last Name</label>
						<Input
							type="text"
							defaultValue={Profile.last_name || ""}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>,
							) =>
								OnUpdate({
									type: "SET_LASTNAME",
									payload: e.target.value,
								})
							}
							className="w-32 rounded-lg border-2 border-gray-300 p-2"
						/>
					</div>
				</div>

				<div className="mb-4 flex flex-col items-center">
					<label className="mb-2 text-lg font-bold">Pronouns</label>
					<Input
						type="text"
						defaultValue={Profile.pronouns || ""}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							updatePronouns(e.target.value)
						}
						className="w-64 rounded-lg border-2 border-gray-300 p-2"
					/>
				</div>
				<div className="mb-4 flex flex-col items-center">
					<label className="mb-2 text-lg font-bold">Bio</label>
					<Textarea
						defaultValue={Profile.bio || ""}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							updateBio(e.target.value)
						}
						className="h-32 w-64 rounded-lg border-2 border-gray-300 p-2"
					/>
				</div>
				<button
					className="rounded-lg bg-blue-500 px-4 py-2 text-white"
					onClick={() => createProfile(Profile)}
				>
					{" "}
					SUBMIT
				</button>
			</div>
		</div>
	);
}
