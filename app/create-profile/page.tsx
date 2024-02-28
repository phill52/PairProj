"use-client";
import { useState } from "react";
const [stage, setStage] = useState(0);

type createProfileProps = {
	username: string;
	skills: string[];
};

const pageData = {
	username: "Phill",
	skills: ["React", "TypeScript", "Python"],
};

export default function Page() {
	return <div className="bg-primary flex h-screen flex-col"></div>;
}
