export default function View1({ username }: { username: string }) {
	return (
		<div className="flex h-screen flex-col">
			<h1>
				Welcome <h2 className="font-bold text-[#0066FF]">{username}</h2>
			</h1>
		</div>
	);
}
