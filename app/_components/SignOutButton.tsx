import { HiArrowRightEndOnRectangle } from "react-icons/hi2";

const SignOutButton = () => {
	return (
		<button className="py-3 px-5 hover:bg-primary-900 duration-400 rounded-sm hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
			<HiArrowRightEndOnRectangle className="h-5 w-5 text-primary-600 mb-0.5" />
			<span>Sign out</span>
		</button>
	);
};

export default SignOutButton;
