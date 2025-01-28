import Link from "next/link";
import React from "react";

const Page = () => {
	return (
		<>
			<title>Account | The Wild Oasis</title>
			<div>
				<h2 className="font-semibold text-2xl text-accent-400 mb-7">
					Welcome, Miriam
				</h2>

				<Link href="/">Back to the main page</Link>
			</div>
		</>
	);
};
export default Page;
