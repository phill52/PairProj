import { EducationItem, ExperienceItem } from "../../../types/profile-items";
import { SubmitProfileDataAction } from "../create-profile";
import { MonthPickerWithRange } from "@/components/monthrangepicker";
// import { account } from "../../../db/schema";
import { Checkbox } from "@/components/ui/checkbox";

export default function View5({
	ExistingEducation,
	ExistingExperience,
	OnUpdate,
}: {
	ExistingEducation: EducationItem[];
	ExistingExperience: ExperienceItem[];
	OnUpdate: React.Dispatch<SubmitProfileDataAction>;
}) {
	const updateEducation = (
		index: number,
		key: keyof EducationItem,
		value: Date | string | null,
	) => {
		OnUpdate({
			type: "SET_EDUCATION",
			payload: ExistingEducation.map((item, i) => {
				if (i === index) {
					return {
						...item,
						[key]: value,
					};
				}
				return item;
			}),
		});
	};
	const addEducation = () => {
		OnUpdate({
			type: "SET_EDUCATION",
			payload: [
				...ExistingEducation,
				{
					school: "",
					degree: "",
					field: "",
					startDate: new Date(),
					endDate: new Date(),
				},
			],
		});
	};
	const removeEducation = (index: number) => {
		OnUpdate({
			type: "SET_EDUCATION",
			payload: ExistingEducation.filter((_, i) => i !== index),
		});
	};
	const updateExperience = (
		index: number,
		key: keyof ExperienceItem,
		value: Date | string | null,
	) => {
		OnUpdate({
			type: "SET_EXPERIENCE",
			payload: ExistingExperience.map((item, i) => {
				if (i === index) {
					return {
						...item,
						[key]: value,
					};
				}
				return item;
			}),
		});
	};
	const addExperience = () => {
		OnUpdate({
			type: "SET_EXPERIENCE",
			payload: [
				...ExistingExperience,
				{
					company: "",
					position: "",
					description: "",
					startDate: new Date(),
					endDate: new Date(),
				},
			],
		});
	};
	const removeExperience = (index: number) => {
		OnUpdate({
			type: "SET_EXPERIENCE",
			payload: ExistingExperience.filter((_, i) => i !== index),
		});
	};

	return (
		<div className="flex flex-col overflow-scroll p-4 lg:px-40">
			<h1 className="mb-4 text-4xl font-semibold">Education</h1>
			<div className="space-y-4">
				{ExistingEducation.map((item, index) => (
					<div key={index} className="space-y-2">
						<input
							className="w-full rounded border border-gray-300 p-2"
							placeholder="School"
							value={item.school}
							onChange={(e) =>
								updateEducation(index, "school", e.target.value)
							}
						/>
						<input
							className="w-full rounded border border-gray-300 p-2"
							placeholder="Degree"
							value={item.degree}
							onChange={(e) =>
								updateEducation(index, "degree", e.target.value)
							}
						/>
						<input
							className="w-full rounded border border-gray-300 p-2"
							placeholder="Field of study"
							value={item.field}
							onChange={(e) =>
								updateEducation(index, "field", e.target.value)
							}
						/>

						<div className="flex flex-col justify-start">
							<MonthPickerWithRange
								startDate={ExistingEducation[index].startDate}
								endDate={ExistingEducation[index].endDate}
								onStartDateChange={(startDate) => {
									if (startDate) {
										updateEducation(
											index,
											"startDate",
											startDate,
										);
									}
								}}
								onEndDateChange={(endDate) => {
									if (endDate) {
										updateEducation(
											index,
											"endDate",
											endDate,
										);
									}
								}}
							/>
							<div className="my-2 flex items-center space-x-2">
								<Checkbox
									id={`education-${index}-present`}
									checked={item.endDate === null}
									onCheckedChange={(checked) => {
										updateEducation(
											index,
											"endDate",
											checked ? null : new Date(),
										);
									}}
								/>
								<label
									htmlFor={`education-${index}-present`}
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									I currently study here
								</label>
							</div>
						</div>
						<button
							className="w-full rounded bg-red-500 p-2 text-white"
							onClick={() => removeEducation(index)}
						>
							Remove
						</button>
					</div>
				))}
				<button
					className="w-full rounded bg-green-500 p-2 text-white"
					onClick={addEducation}
				>
					Add Education
				</button>
			</div>
			<h1 className="mb-4 text-4xl font-semibold">Experience</h1>
			<div className="space-y-4">
				{ExistingExperience.map((item, index) => (
					<div key={index} className="space-y-2">
						<input
							className="w-full rounded border border-gray-300 p-2"
							placeholder="Company"
							value={item.company}
							onChange={(e) =>
								updateExperience(
									index,
									"company",
									e.target.value,
								)
							}
						/>
						<input
							className="w-full rounded border border-gray-300 p-2"
							placeholder="Position"
							value={item.position}
							onChange={(e) =>
								updateExperience(
									index,
									"position",
									e.target.value,
								)
							}
						/>
						<textarea
							className="w-full rounded border border-gray-300 p-2"
							placeholder="Description"
							value={item.description}
							onChange={(e) =>
								updateExperience(
									index,
									"description",
									e.target.value,
								)
							}
						/>
						<MonthPickerWithRange
							startDate={item.startDate}
							endDate={item.endDate}
							onStartDateChange={(startDate) => {
								if (startDate) {
									updateExperience(
										index,
										"startDate",
										startDate,
									);
								}
							}}
							onEndDateChange={(endDate) => {
								if (endDate) {
									updateExperience(index, "endDate", endDate);
								}
							}}
						/>
						<div className="my-2 flex items-center space-x-2">
							<Checkbox
								id={`experience-${index}-present`}
								checked={item.endDate === null}
								onCheckedChange={(checked) => {
									updateExperience(
										index,
										"endDate",
										checked ? null : new Date(),
									);
								}}
							/>
							<label
								htmlFor={`experience-${index}-present`}
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								I currently work here
							</label>
						</div>
						<button
							className="w-full rounded bg-red-500 p-2 text-white"
							onClick={() => removeExperience(index)}
						>
							Remove
						</button>
					</div>
				))}
				<button
					className="w-full rounded bg-green-500 p-2 text-white"
					onClick={addExperience}
				>
					Add Experience
				</button>
			</div>
		</div>
	);
}
