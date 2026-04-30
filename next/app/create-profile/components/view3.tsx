import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SubmitProfileDataAction } from "../create-profile";

export function View3({
	OnUpdate,
	onContinue,
}: {
	OnUpdate: React.Dispatch<SubmitProfileDataAction>;
	onContinue: () => void;
}) {
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setPreview(event.target?.result as string);
			};
			reader.readAsDataURL(file);
			setImageFile(file);
		}
	};

	const handleContinue = () => {
		if (imageFile) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const base64 = e.target?.result as string;
				OnUpdate({ type: "SET_IMAGE", payload: base64 });
				onContinue();
			};
			reader.readAsDataURL(imageFile);
		} else {
			OnUpdate({ type: "SET_IMAGE", payload: "" });
			onContinue();
		}
	};

	return (
		<div className="flex flex-col p-4 lg:px-40">
			<h1 className="mb-4 text-4xl font-semibold">Upload Profile Picture?</h1>
			<div className="space-y-4">
				<Input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					className="w-full"
				/>
				{preview && (
					<div className="relative w-32 h-32">
						<Image
							src={preview}
							alt="Preview"
							fill
							className="object-cover rounded"
						/>
					</div>
				)}
				<Button
					onClick={handleContinue}
					className="mt-4 bg-blue-600 hover:bg-blue-700"
				>
					Continue
				</Button>
			</div>
		</div>
	);
}
