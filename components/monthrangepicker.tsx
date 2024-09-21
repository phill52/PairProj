"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, isAfter } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface MonthPickerWithRangeProps
	extends React.HTMLAttributes<HTMLDivElement> {
	startDate?: Date | null;
	endDate?: Date | null;
	onStartDateChange?: (date: Date | null) => void;
	onEndDateChange?: (date: Date | null) => void;
}
//TODO: make it not possible to select start date after end date
export function MonthPickerWithRange({
	className,
	startDate: externalStartDate,
	endDate: externalEndDate,
	onStartDateChange,
	onEndDateChange,
}: MonthPickerWithRangeProps) {
	const [internalStartDate, setInternalStartDate] =
		React.useState<Date | null>(null);
	const [internalEndDate, setInternalEndDate] = React.useState<Date | null>(
		null,
	);

	const startDate =
		externalStartDate !== undefined ? externalStartDate : internalStartDate;
	const endDate =
		externalEndDate !== undefined ? externalEndDate : internalEndDate;

	const upToPresent = !endDate;

	const years = Array.from(
		{ length: 50 },
		(_, i) => new Date().getFullYear() - i,
	);
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const handleStartDateChange = (year: string, month: string): void => {
		const newDate = new Date(parseInt(year), months.indexOf(month));
		if (onStartDateChange) {
			onStartDateChange(newDate);
		} else {
			setInternalStartDate(newDate);
		}
	};

	const handleEndDateChange = (year: string, month: string) => {
		const newDate = new Date(parseInt(year), months.indexOf(month));
		if (startDate && isAfter(newDate, startDate)) {
			if (onEndDateChange) {
				onEndDateChange(newDate);
			} else {
				setInternalEndDate(newDate);
			}
		}
	};

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-[300px] justify-start text-left font-normal",
							!startDate && "text-muted-foreground",
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{startDate ? (
							<>
								{format(startDate, "MMM yyyy")}
								{upToPresent
									? " - Present"
									: endDate
										? ` - ${format(endDate, "MMM yyyy")}`
										: ""}
							</>
						) : (
							<span>Pick a date range</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-4" align="start">
					<div className="space-y-2">
						<div className="grid grid-cols-2 gap-2">
							<Select
								onValueChange={(year) =>
									handleStartDateChange(
										year,
										months[startDate?.getMonth() || 0],
									)
								}
							>
								<SelectTrigger>
									<SelectValue
										placeholder={
											externalStartDate
												? externalStartDate
														.getFullYear()
														.toString()
												: "Start Year"
										}
									/>
								</SelectTrigger>
								<SelectContent>
									{years.map((year) => (
										<SelectItem
											key={year}
											value={year.toString()}
										>
											{year}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Select
								onValueChange={(month) =>
									handleStartDateChange(
										startDate?.getFullYear().toString() ||
											"",
										month,
									)
								}
							>
								<SelectTrigger>
									<SelectValue
										placeholder={
											externalStartDate
												? new Intl.DateTimeFormat(
														"en-US",
														{ month: "long" },
													).format(externalStartDate)
												: "Start Month"
										}
									/>
								</SelectTrigger>
								<SelectContent>
									{months.map((month) => (
										<SelectItem key={month} value={month}>
											{month}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						{!upToPresent && (
							<div className="grid grid-cols-2 gap-2">
								<Select
									onValueChange={(year) =>
										handleEndDateChange(
											year,
											months[endDate?.getMonth() || 0],
										)
									}
								>
									<SelectTrigger>
										<SelectValue
											placeholder={
												externalEndDate
													? externalEndDate
															.getFullYear()
															.toString()
													: "End Year"
											}
										/>
									</SelectTrigger>
									<SelectContent>
										{years.map((year) => (
											<SelectItem
												key={year}
												value={year.toString()}
											>
												{year}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<Select
									onValueChange={(month) =>
										handleEndDateChange(
											endDate?.getFullYear().toString() ||
												"",
											month,
										)
									}
								>
									<SelectTrigger>
										<SelectValue
											placeholder={
												externalEndDate
													? new Intl.DateTimeFormat(
															"en-US",
															{ month: "long" },
														).format(
															externalEndDate,
														)
													: "End Month"
											}
										/>
									</SelectTrigger>
									<SelectContent>
										{months.map((month) => (
											<SelectItem
												key={month}
												value={month}
											>
												{month}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
