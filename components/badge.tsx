import React from "react";

interface BadgeProps {
	innerColor: string;
	outerColor: string;
	text: string;
}

const Badge: React.FC<BadgeProps> = ({ innerColor, outerColor, text }) => {
	console.log(innerColor, outerColor, text);
	const styleString = `inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium bg-[${outerColor}] text-[${innerColor}] border border-[${innerColor}] rounded-md]`;
	console.log(styleString);
	return <span className={styleString}>{text}</span>;
};

export default Badge;
