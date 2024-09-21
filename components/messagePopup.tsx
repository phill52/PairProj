"use client";
import React, { useState } from "react";
import Image from "next/image";

const MessagePopup = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div
			className={`bg-slate-200 transition-height relative flex items-start justify-between outline duration-150 ease-in-out ${
				isExpanded ? "h-80 w-96" : "h-10 w-72"
			}`}
		>
			<p className="m-2 ml-4 text-xl">Direct Messages</p>
			<button onClick={() => setIsExpanded(!isExpanded)} className="m-2 mr-4">
				{isExpanded ? (
					<Image
						alt="down"
						src="/icons/chevron-down-solid.svg"
						width={28}
						height={28}
					/>
				) : (
					<Image
						alt="up"
						src="/icons/chevron-up-solid.svg"
						width={28}
						height={28}
					/>
				)}
			</button>
		</div>
	);
};

export default MessagePopup;
