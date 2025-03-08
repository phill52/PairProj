import { routes } from "@/routes/routes";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
			<h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
			<h2 className="mb-4 text-2xl font-semibold text-gray-600">
				Page Not Found
			</h2>
			<p className="mb-8 text-gray-500">
				Oops! The page you&apos;re looking for doesn&apos;t exist.
			</p>
			<Link
				href={routes.home()}
				className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
			>
				Go Home
			</Link>
		</div>
	);
}
