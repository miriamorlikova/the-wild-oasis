"use client";

import Link from "next/link";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const NotFound = () => {
	return (
		<main className="flex justify-center items-center flex-col gap-6">
			<h1 className="text-3xl font-semibold">Something went wrong!</h1>
			<p className="text-lg">This cabin was not found.</p>
			<div className="flex flex-col gap-8 mt-4 justify-center items-center">
				<Link
					className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
					href="/cabins"
				>
					<div className="flex justify-center items-center">
						Go back to all cabins
						<HiOutlineArrowLongRight className="mb-0.5 ml-2" />
					</div>
				</Link>
			</div>
		</main>
	);
};
export default NotFound;
