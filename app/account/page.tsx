import Link from "next/link";
import React from "react";
import { auth } from "../_library/auth";

const Page = async () => {
	const session = await auth();

	if (!session) {
		return;
	}

	const firstName = session?.user?.name?.split(" ").at(0);

	return (
		<>
			<title>Account | The Wild Oasis</title>
			<div>
				<h2 className="font-semibold text-2xl text-accent-400 mb-7">
					Welcome, {firstName}
				</h2>

				<Link href="/">Back to the main page</Link>
			</div>
		</>
	);
};
export default Page;
