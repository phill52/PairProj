"use client";

import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { FilterObject } from "../FiltersContext";

export type OptionType = {
	label: string;
	value: string;
};

interface MultiSelectProps {
	options: OptionType[];
	selected: FilterObject[];
	onChange: Dispatch<SetStateAction<FilterObject[]>>;
	className?: string;
	name: string;
	label: string;
}

function MultiSelect({
	options,
	selected,
	onChange,
	className,
	name,
	label,
	...props
}: MultiSelectProps) {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen} {...props}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={`w-48 justify-between ${
						selected.length > 1 ? "h-full" : "h-10"
					}`}
				>
					<p>{name}</p>
					<Image
						alt="caret-sort"
						src="/icons/caret-sort.svg"
						className="ml-auto"
						width={24}
						height={24}
					/>
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-48 p-0">
				<Command className={className}>
					<CommandInput placeholder={`Search ${name}...`} />
					<CommandEmpty>No item found.</CommandEmpty>

					<CommandGroup className="max-h-64 overflow-auto">
						{options.map((option) => {
							const isSelected = selected.some(
								(item) =>
									item.label === label &&
									item.value === option.value,
							);

							return (
								<CommandItem
									key={option.value}
									onSelect={() => {
										if (isSelected) {
											onChange(
												selected.filter(
													(item) =>
														!(
															item.label ===
																label &&
															item.value ===
																option.value
														),
												),
											);
										} else {
											onChange([
												...selected,
												{
													label: label,
													value: option.value,
												},
											]);
										}

										setOpen(false);
									}}
								>
									{option.label}

									<Image
										alt="check"
										src="/icons/checkmark-outline.svg"
										className={`ml-auto ${
											isSelected
												? "opacity-100"
												: "opacity-0"
										}`}
										width={20}
										height={20}
									/>
								</CommandItem>
							);
						})}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export { MultiSelect };