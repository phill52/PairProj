import Image from "next/image";
import { SubmitProfileDataAction } from "../page";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
//TODO: add profile picture
export default function View6({
	ExistingName,
	ExistingPronouns,
	ExistingBio,
	OnUpdate,
}: {
	ExistingName: string;
	ExistingPronouns: string;
	ExistingBio: string;
	OnUpdate: React.Dispatch<SubmitProfileDataAction>;
}) {
	const updateName = (name: string) => {
		OnUpdate({
			type: "SET_NAME",
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
					<label className="mb-2 text-lg font-bold">Name</label>
					<Input
						type="text"
						value={ExistingName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							updateName(e.target.value)
						}
						className="w-64 rounded-lg border-2 border-gray-300 p-2"
					/>
				</div>
				<div className="mb-4 flex flex-col items-center">
					<label className="mb-2 text-lg font-bold">Pronouns</label>
					<Input
						type="text"
						value={ExistingPronouns}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							updatePronouns(e.target.value)
						}
						className="w-64 rounded-lg border-2 border-gray-300 p-2"
					/>
				</div>
				<div className="mb-4 flex flex-col items-center">
					<label className="mb-2 text-lg font-bold">Bio</label>
					<Textarea
						value={ExistingBio}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							updateBio(e.target.value)
						}
						className="h-32 w-64 rounded-lg border-2 border-gray-300 p-2"
					/>
				</div>
			</div>
		</div>
	);
}
