import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThickArrowRightIcon } from "@radix-ui/react-icons";

export default function ComposeBar() {
	return (
		<div className="fixed bottom-0 mx-auto mb-10 ml-[200px] h-16 w-3/5 rounded-2xl bg-stone-100">
			<div className="flex items-center">
				<Input
					placeholder="Message Rocco Vaccone"
					className="h-16 rounded-2xl border-none transition-colors duration-300 hover:bg-stone-200 focus-visible:ring-0"
				/>
				<Button
					variant="ghost"
					className="h-16 space-x-2 rounded-2xl transition-colors duration-300 hover:bg-stone-200"
				>
					<ThickArrowRightIcon width="40" height="40" />
				</Button>
			</div>
		</div>
	);
}
