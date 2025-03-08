import Link from "next/link";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const NotFound = () => {
	return (
		<main className="text-center space-y-6 mt-4">
			<h1 className="text-3xl font-semibold">
				This page probably doesn't exist.
			</h1>
			<Link
				href="/"
				className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
			>
				<div className="flex justify-center items-center">
					Go back to main page
					<HiOutlineArrowLongRight className="mb-0.5 ml-2" />
				</div>
			</Link>
		</main>
	);
};

export default NotFound;
