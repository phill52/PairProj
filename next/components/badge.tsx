"use client";
import React from "react";
import { HTMLAttributes } from "react";
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	innerColor: string;
	outerColor: string;
	text: string;
}

export default function Badge({
	innerColor,
	outerColor,
	text,
	...props
}: BadgeProps) {
	console.log(innerColor, outerColor, text);
	const styleString = `inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium border rounded-md] ${props.onClick ? "hover:underline hover:cursor-pointer" : ""}`;
	console.log(styleString);
	return (
		<span
			className={styleString}
			style={{
				backgroundColor: outerColor,
				color: innerColor,
				borderColor: innerColor,
			}}
			{...props}
		>
			{text}
		</span>
	);
}
