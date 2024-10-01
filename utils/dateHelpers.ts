export default function dateToMonthYear(date: Date | null): string {
	if (!date) {
		return "Present";
	}
	return `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
}
