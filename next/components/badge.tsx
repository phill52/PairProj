"use client";
import React from "react";
import { HTMLAttributes } from "react";
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	innerColor: string;
	outerColor: string;
	text?: string;
}

export default function Badge({
  innerColor,
  outerColor,
  text,
  className,
  ...props
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center gap-2 rounded-full px-3 py-0.5 text-sm font-medium border";

  return (
    <span
      {...props}
      className={`${baseClasses} ${
        props.onClick ? "hover:underline cursor-pointer" : ""
      } ${className ?? ""}`}
      style={{
        backgroundColor: outerColor,
        color: innerColor,
        borderColor: innerColor,
      }}
    >
      {props.children ?? text}
    </span>
  );
}