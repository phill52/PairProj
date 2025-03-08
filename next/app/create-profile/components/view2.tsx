export default function View2({ handleLetsGo }: { handleLetsGo: () => void }) {
	return (
		<div className="flex w-4/5 flex-col">
			<p className="text-center text-5xl text-[#39405E]">
				Let&apos;s spruce up your profile! By adding a few more details
				about your skills and interests, you`&apos`ll make it easier for
				the right projects to find you.
			</p>
			<div className="mx-20 flex flex-row justify-between pt-20">
				<button className="m-2 rounded-2xl bg-[#E99C9C] p-2 px-10 py-4 text-3xl text-[#39405E] duration-200 ease-in-out hover:bg-[#ba4e4e]">
					Go home
				</button>
				<button
					className="m-2 rounded-2xl bg-[#9CE9A7] p-2 px-10 py-4 text-3xl text-[#39405E] duration-200 ease-in-out hover:bg-[#459951]"
					onClick={handleLetsGo}
				>
					Let`&apos`s go
				</button>
			</div>
		</div>
	);
}
