"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	AvatarIcon,
	DrawingPinFilledIcon,
	PlusCircledIcon,
} from "@radix-ui/react-icons";

export default function MessagesHeader() {
	return (
		<div className="flex h-20 w-full items-center bg-gray-100 drop-shadow-md">
			<Avatar className="mx-5 h-14 w-14">
				<AvatarImage src="https://github.com/rvaccone.png" />
				<AvatarFallback>RV</AvatarFallback>
			</Avatar>
			<h1 className="text-2xl font-bold">Rocco Vaccone</h1>
			<div className="ml-auto mr-2 flex space-x-5">
				<Button variant="ghost" className="mx-0 px-1">
					<DrawingPinFilledIcon width="35" height="35" />
				</Button>
				<Button variant="ghost" className="mx-0 px-1">
					<PlusCircledIcon width="35" height="35" />
				</Button>
				<Button variant="ghost" className="mx-0 px-1">
					<AvatarIcon width="35" height="35" />
				</Button>
			</div>
		</div>
	);
}
