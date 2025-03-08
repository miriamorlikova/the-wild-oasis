"use client";

import { useRouter } from "next/navigation";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

type ErrorProps = {
	error: Error;
	reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
	const router = useRouter();
	return (
		<main className="flex justify-center items-center flex-col gap-6">
			<h1 className="text-3xl font-semibold">Something went wrong!</h1>
			<p className="text-lg">{error.message}</p>
			<div className="flex flex-col gap-8 mt-4 justify-center items-center">
				<button
					className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
					onClick={reset}
				>
					Try again
				</button>
				<button
					className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
					onClick={() => router.push("/")}
				>
					<div className="flex justify-center items-center">
						Go back to main page
						<HiOutlineArrowLongRight className="mb-0.5 ml-2" />
					</div>
				</button>
			</div>
		</main>
	);
};
export default Error;
