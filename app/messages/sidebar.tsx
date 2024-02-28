"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EnvelopeClosedIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function SideBar() {
	return (
		<div className="m-3 w-[200px] drop-shadow-md">
			<h1 className="text-lg font-bold">Direct Messages</h1>
			<Separator className="my-3" />
			<Button
				variant="ghost"
				className="flex h-10 w-full items-center space-x-2"
			>
				<EnvelopeClosedIcon width="20" height="20" />
				<p className="text-gray-500">New Message</p>
			</Button>
			<Separator className="my-3" />
			<Button
				variant="ghost"
				className="flex h-10 w-full items-center space-x-2"
			>
				<MagnifyingGlassIcon width="30" height="30" />
				<p className="text-gray-500">Search Chat</p>
			</Button>
		</div>
	);
}
