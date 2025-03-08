"use client";

import { useFormStatus } from "react-dom";
const SubmitButton = ({
	children,
	pendingLabel,
}: {
	children: React.ReactNode;
	pendingLabel: string;
}) => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			className="bg-accent-500 text-primary-800 px-8 py-4 rounded-sm font-semibold hover:bg-accent-400 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-200"
			disabled={pending}
		>
			{pending ? pendingLabel : children}
		</button>
	);
};
export default SubmitButton;
