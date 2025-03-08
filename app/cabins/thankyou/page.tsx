import Link from "next/link";

const ThankYouPage = () => {
	return (
		<div className="text-center space-y-6 mt-4">
			<h1 className="text-3xl font-semibold">
				Thank you for your reservation!
			</h1>
			<Link
				href="/account/reservations"
				className="text-accent-500 inline-block"
			>
				Manage your reservations &rarr;
			</Link>
		</div>
	);
};

export default ThankYouPage;
