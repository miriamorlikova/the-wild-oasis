import Image from "next/image";
import { signInActionWithGoogle } from "../_library/actions";

const SignInButton = () => {
	return (
		<form action={signInActionWithGoogle}>
			<button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium rounded-sm">
				<Image
					src="https://authjs.dev/img/providers/google.svg"
					alt="Google logo"
					height="24"
					width="24"
				/>
				<span>Continue with Google</span>
			</button>
		</form>
	);
};

export default SignInButton;
