import React from "react";
import SignInButton from "../_components/SignInButton";

export const metadata = {
	title: "Login | The Wild Oasis",
};

const Page = () => {
	return (
		<div className="flex flex-col gap-10 justify-center items-center">
			<h2 className="text-3xl font-semibold">
				Sign in to access your guest area.
			</h2>
			<SignInButton />
		</div>
	);
};
export default Page;
